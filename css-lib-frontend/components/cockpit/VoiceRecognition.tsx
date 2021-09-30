// REACT
import React, { Fragment, useEffect, useState } from "react";

// THIRD PARTY
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";

// HELPERS
import {
  SET_LIVE_TRANSCRIPT,
  ADDRESS,
  SET_VEHICULE,
  MDV,
  CODEQ_SENTIMENT,
  SET_LIVE_ENTITIES,
} from "../../helpers/constants";

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
  currentRecognitionCockpit: (data) => void;
  historyRecognitionCockpit: (data) => void;
  currentConducteurCockpit: (data) => void;
  currentTiresCockpit: (data) => void;
  currentAssureurCockpit: (data) => void;
  currentAddressCockpit: (data) => void;
  currentImmatCockpit: (data) => void;
  currentMDVCockpit: (data) => void;
  currentSentimentCockpit: (data) => void;
  isAudioOpen: boolean;
  buttonType: string;
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
      setCurrentRecognition("...");
      setRecognitionHistory((old) => [data.transcript, ...old]);
      props.currentRecognitionCockpit(data.transcript);
      props.historyRecognitionCockpit((old) => [data.transcript, ...old]);
    }
    if (data.type === SET_LIVE_ENTITIES) {
      data = data.data;
      if (data.type === ADDRESS) {
        props.currentAddressCockpit(data.name);
      }
    }
    if (data.type === SET_VEHICULE) {
      props.currentImmatCockpit(data.immatriculation);
      props.currentConducteurCockpit(data.conducteur);
      props.currentAssureurCockpit(data.assureur);
      props.currentTiresCockpit(data.tires);
    }
    if (data.data?.type === MDV) {
      props.currentMDVCockpit(data.data.name);
    }
    if (data.data?.type === CODEQ_SENTIMENT) {
      console.log(data.data?.name[0]?.sentiments[0]);
      props.currentSentimentCockpit(data.data?.name[0]?.sentiments[0]);
    }
  };

  const connect = () => {
    console.log("connecting");
    setShowStop(true);
    connection?.close();
    let isDevelopment = true;
    if (process.env.NODE_ENV === "production") isDevelopment = false;
    // const location = isDevelopment ? "localhost:8080" : document.location.host;
    const location = isDevelopment
      ? "localhost:8080"
      : "imalab-showroom-backend.herokuapp.com";
    const url = encodeURI(
      `${document.location.protocol.replace(
        "http",
        "ws"
      )}//${location}/v1/ws/stt?numcharge=12345&showroom=showroomdev`
    );

    const conn = new WebSocket(url);
    conn.onmessage = (event) => speechRecognized(JSON.parse(event.data));
    setConnection(conn);
  };

  const disconnect = () => {
    let isDevelopment = true;
    if (process.env.NODE_ENV === "production") isDevelopment = false;
    const location = isDevelopment
      ? "localhost:8080"
      : "imalab-showroom-backend.herokuapp.com";
    const url = encodeURI(
      `${document.location.protocol}//${location}/closechannel?showroom=showroom`
    );
    axios.post(url, { method: "POST" }).then((r) => console.log(r.status));
    connection?.close();
    setConnection(undefined);
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
      {props.buttonType === "start" && (
        <button className='popup__button' onClick={connect}>
          Commencer !
        </button>
      )}
      {showStop && (
        // <button className='popup__button' onClick={disconnect}>
        //   Stop
        // </button>
        <div className='cockpit__button-stop'>
          <button
            className='btn__fun-button btn__fun-button--first'
            onClick={disconnect}
          >
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
        </div>
      )}
      {/* <h2>{currentRecognition}</h2>
      {recognitionHistory.map((tx, idx) => (
        <h2 key={idx}>{tx}</h2>
      ))} */}
    </Fragment>
  );
};

export default VoiceStreamer;
