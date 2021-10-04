// REACT
import React, { Fragment, useEffect, useState } from "react";

// THIRD PARTY
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";

// HELPERS
import {
  SET_LIVE_TRANSCRIPT,
  SET_LIVE_TRADUCTION,
} from "../../helpers/constants";
import { makeid } from "../../helpers/randomid";

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
  console.log("_______TEXTE_____");
  console.log(myPhrase);
  if (process.env.NODE_ENV === "production") isDevelopment = false;
  const location = isDevelopment
    ? "imalab-showroom-backend.herokuapp.com"
    : "imalab-showroom-backend.herokuapp.com";
  const url = encodeURI(
    `${document.location.protocol}//${location}/uberduck-ai`
  );
  axios
    .post(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: { phrase: myPhrase },
    })
    .then((r) => console.log(r));
}

const VoiceStreamer: React.FC<Props> = (props: Props) => {
  const [connection, setConnection] = useState<WebSocket>();
  const [currentRecognition, setCurrentRecognition] = useState<string>("");
  const [recognitionHistory, setRecognitionHistory] = useState<Array<string>>(
    []
  );
  const [showStop, setShowStop] = useState(false);
  const speechRecognized = (data) => {
    if (data?.type === SET_LIVE_TRANSCRIPT) {
      setCurrentRecognition(data.transcript);
      setRecognitionHistory((old) => [data.transcript, ...old]);
      props.customerSpeech((old) => [data.transcript, ...old]);
    }
    if (data.type === SET_LIVE_TRADUCTION) {
      const myText = data.text.replace("&#39;", "'");
      props.customerSpeechEn((old) => [myText, ...old]);
      console.log("____current recognition____");
      console.log(myText);
      getVoice(myText);
    }
  };

  const connect = () => {
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
    </Fragment>
  );
};

export default VoiceStreamer;
