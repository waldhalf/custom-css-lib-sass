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
  currentRecognitionCockpit: (data) => void;
  historyRecognitionCockpit: (data) => void;
  currentConducteurCockpit: (data) => void;
  currentTiresCockpit: (data) => void;
  currentAssureurCockpit: (data) => void;
  currentAddressCockpit: (data) => void;
  currentImmatCockpit: (data) => void;
  currentMDVCockpit: (data) => void;
  currentSentimentCockpit: (data) => void;
  currentIncidentCockpit: (data) => void;
  isAudioOpen: boolean;
  buttonType: string;
}

const VoiceStreamer: React.FC<Props> = (props: Props) => {
  const [connection, setConnection] = useState<WebSocket>();

  const [showStop, setShowStop] = useState(false);
  const speechRecognized = (data) => {
    if (data?.type === SET_LIVE_TRANSCRIPT) {
      props.currentRecognitionCockpit(data.transcript);
      props.historyRecognitionCockpit((old) => [...old, data.transcript]);
    }
    if (data.type === SET_LIVE_ENTITIES) {
      data = data.data;
      if (data.type === ADDRESS) {
        props.currentAddressCockpit(data.name);
      }
      if (data.type.startsWith("VEH")) {
        props.currentIncidentCockpit(data.name);
      }
      if (data.type === CODEQ_SENTIMENT) {
        console.log(data.name[0]?.sentiments[0]);
        props.currentSentimentCockpit(data.name[0]?.sentiments[0]);
      }
      if (data.type === MDV) {
        props.currentMDVCockpit(data.name);
      }
    }
    if (data.type === SET_VEHICULE) {
      props.currentImmatCockpit(data.immatriculation);
      props.currentConducteurCockpit(data.conducteur);
      props.currentAssureurCockpit(data.assureur);
      props.currentTiresCockpit(data.tires);
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
      .post(url)
      .then((r) => console.log(r.status));
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
