// REACT
import React, { Fragment, useEffect, useState } from "react";

// THIRD PARTY
import axios from "axios";

// HELPERS
import {
  SET_LIVE_TRANSCRIPT,
  SET_LIVE_TRADUCTION,
} from "../../helpers/constants";
import { makeid } from "../../helpers/randomid";
import AudioPlayer from "./AudioPlayer";

const sampleRate = 16000;

const loadPCMWorker = async (audioContext: AudioContext) =>
  audioContext.audioWorklet.addModule("/pcmWorker.js");

const getMediaStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: "default",
      sampleRate: sampleRate,
      sampleSize: 16,
      channelCount: 1,
    },
    video: false,
  });

const captureAudio = (
  audioContext: AudioContext,
  stream: MediaStream,
  output: (data: any) => void
) => {
  const source: MediaStreamAudioSourceNode =
    audioContext.createMediaStreamSource(stream);
  const pcmWorker = new AudioWorkletNode(audioContext, "pcm-worker", {
    outputChannelCount: [1],
  });
  source.connect(pcmWorker);
  pcmWorker.port.onmessage = (event) => output(event.data);
  pcmWorker.port.start();
};

interface Props {
  props: any;
  customerSpeech: (data) => void;
  customerSpeechEn: (data) => void;
  isAudioOpen: boolean;
  buttonType: string;
  buttonStop: string;
  cssClass: string;
  text: string;
}

function getVoice(myPhrase) {
    let isDevelopment = true;
    const data = {phrase: myPhrase}
    if (process.env.NODE_ENV === "production") isDevelopment = false;
    const location = isDevelopment
        ? "imalab-showroom-backend.herokuapp.com"
        : "imalab-showroom-backend.herokuapp.com";
    const url = encodeURI(
        `${document.location.protocol}//${location}/uberduckai`
    );

    /* INIT NB WAV REQUEST */
    let nbWavQuery = localStorage.getItem("nbWavQuery");
    let nbWavTot = localStorage.getItem("nbWavTot");

    if (nbWavQuery === null) nbWavQuery = '0';
    if (nbWavTot === null) nbWavTot = '0';

    nbWavQuery = (parseInt(nbWavQuery)+1).toString()
    localStorage.setItem("nbWavQuery", nbWavQuery);

  /* REQUEST WAV */
  axios
        .post(url, data)
        .then((r) => {
          let wavPaths = localStorage.getItem("wavPaths");
          if (wavPaths === null) {
            let paths = [{src: r.data.path, type: 'audio/x-wav'}]
            wavPaths = JSON.stringify(paths)
          }
          else {
            let paths = [...JSON.parse(wavPaths), {src: r.data.path, type: 'audio/x-wav'}]
            wavPaths = JSON.stringify(paths)
          }

          nbWavTot = (parseInt(nbWavTot)+1).toString()
          localStorage.setItem("wavPaths", wavPaths);
          localStorage.setItem("nbWavTot", nbWavTot);
        });
}

const VoiceStreamer: React.FC<Props> = (props: Props) => {
  const [connection, setConnection] = useState<WebSocket>();
  const [currentRecognition, setCurrentRecognition] = useState<string>("");
  const [recognitionHistory, setRecognitionHistory] = useState<Array<string>>(
    []
  );
  const [wavLaunch, setWavLaunch] = useState<boolean>(false);
  const [showStop, setShowStop] = useState<boolean>(false);
  const [waitingMessage, setWaitingMessage] = useState<boolean>(false);

  const speechRecognized = (data) => {
    if (data?.type === SET_LIVE_TRANSCRIPT) {
      setCurrentRecognition(data.transcript);
      setRecognitionHistory((old) => [data.transcript, ...old]);
      props.customerSpeech((old) => [...old, data.transcript]);
    }
    if (data.type === SET_LIVE_TRADUCTION) {
      const myText = data.text.replaceAll("&#39;", "'");
      props.customerSpeechEn((old) => [...old, myText]);
      getVoice(myText);
    }
  };

  const connect = () => {
    setWavLaunch(false);
    localStorage.removeItem("nbWavQuery")
    localStorage.removeItem("nbWavTot")
    localStorage.removeItem("wavPaths")
    console.log("connecting");
    setShowStop(true);
    connection?.close();
    let isDevelopment = true;
    if (process.env.NODE_ENV === "production") isDevelopment = false;
    let showroom = "showroom" + (isDevelopment ? "DEV" : "") + makeid(5);
    localStorage.setItem("showroom", showroom);
    showroom = localStorage.getItem("showroom");
    const location = isDevelopment
      ? "imalab-showroom-backend.herokuapp.com"
      : "imalab-showroom-backend.herokuapp.com";
    const url = encodeURI(
      `${document.location.protocol.replace(
        "http",
        "ws"
      )}//${location}/v1/ws/stt?numcharge=12345&showroom=${showroom}`
    );

    const conn = new WebSocket(url);
    conn.onmessage = (event) => speechRecognized(JSON.parse(event.data));
    setConnection(conn);
  };

  const disconnect = () => {
    let isDevelopment = true;
    if (process.env.NODE_ENV === "production") isDevelopment = false;
    let showroom = localStorage.getItem("showroom");
    const location = isDevelopment
      ? "imalab-showroom-backend.herokuapp.com"
      : "imalab-showroom-backend.herokuapp.com";
    const url = encodeURI(
      `${document.location.protocol}//${location}/closechannel?showroom=${showroom}`
    );
    axios
      .post(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((r) => console.log(r.status));
    connection?.close();
    setConnection(undefined);
    props.customerSpeech([""]);
    props.customerSpeechEn([""]);
    setWaitingMessage(true);
    // let nbWavQuery = localStorage.getItem("nbWavQuery");
    // let nbWavTot = localStorage.getItem("nbWavTot");
    // if(nbWavQuery === null || nbWavTot === null) return

    setTimeout(function () {
        setWavLaunch(true)
        setWaitingMessage(false)
    }, 7000);
  };



  useEffect(() => {
    if (props.isAudioOpen && !connection) {
      connect();
    }
    if (!props.isAudioOpen && connection) {
      disconnect();
    }
  }, [props.isAudioOpen]);

  useEffect(() => {
    if (connection) {
      const audioContext = new window.AudioContext({ sampleRate });
      const stream = Promise.all([
        loadPCMWorker(audioContext),
        getMediaStream(),
      ]).then(([_, stream]) => {
        captureAudio(audioContext, stream, (data) => connection.send(data));
        return stream;
      });
      return () => {
        stream.then((stream) =>
          stream.getTracks().forEach((track) => track.stop())
        );
        audioContext.close();
      };
    }
  }, [connection]);

  return (
    <Fragment>
      <div className="content-flex content-flex__justify-center first">
      {connection === undefined && (
        <div className={props.cssClass}>
          <button onClick={connect}>Commencer</button>
        </div>
      )}
      {connection !== undefined && (
        <div className={props.cssClass}>
          <button onClick={disconnect}>Terminer</button>
        </div>
      )}
      </div>

      <div className="content-flex content-flex__justify-center second">
      {waitingMessage && <div className="mt-75">Laissez-nous quelques secondes pour travailler avec votre voix...</div>}
      {wavLaunch &&  (
        <div id="AudioPlayer">
          <AudioPlayer audioArray={JSON.parse(localStorage.getItem("wavPaths")).reverse()}/>
        </div>
      )}
      </div>
    </Fragment>
  );
};


// const audioArray = [{src: 'https://uberduck-audio-outputs.s3-us-west-2.amazonaws.com/f84ce3e6-8706-4d46-8de3-84d1f5290bfb/audio.wav', type: 'audio/x-wav'},
//   {src: 'https://uberduck-audio-outputs.s3-us-west-2.amazonaws.com/9ab4c862-51e9-4828-bc8b-65e81861a3c6/audio.wav', type: 'audio/x-wav'},
//   {src: 'https://uberduck-audio-outputs.s3-us-west-2.amazonaws.com/f84ce3e6-8706-4d46-8de3-84d1f5290bfb/audio.wav', type: 'audio/x-wav'},]

export default VoiceStreamer;
