// REACT
import React, { useRef, useState, Fragment } from 'react';

// THIRD PARTY
import Xarrow from 'react-xarrows';

// OWN
import CockpitDialogWindow from "./CockpitDialogWindow";
import CockpitItem from "./CockpitItem";
import Modal from "../layout/Modal";
import Countdown from '../countdown';
import VoiceRecognition from '../cockpit/VoiceRecognition';

const imgMoveOut = "/images/move-out.jpg";
const imgFeelings = "/images/feelings.jpg";
const imgWeather = "/images/weather.jpg";
const imgVehicle = "/images/vehicle.jpg";
const imgFileInfo = "/images/file-info.jpg";

const Box = (props) => {
    return (
        <CockpitItem
            myRef={props.box.ref}
            id={props.box.id}
            name={props.box.name}
            img={props.box.img}
            info={props.info}
            address={props.address}
            immat={props.immat}
            mdv={props.mdv}
            sentiment={props.sentiment}
        />
    );
};

const MainBox = (props) => {
    return (
        <CockpitDialogWindow
            myRef={props.box.ref}
            id={props.box.id}
            name={props.box.name}
            currentRecognition={props.currentRecognition}
            historyRecognition={props.historyRecognition}
        />
    );
};

function CockpitGrid() {
    //MODAL
    const [showModal, setShowModal] = useState(true);
    const duringPopUp = showModal ? " during-popup" : "";
    const img = '/images/modal-explanation.svg';

    // Countdown
    const [startCoundown, setStartCoundown] = useState(false);
    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 1 };

    // Main window
    const [showMainWindow, setShowMainWindow] = useState(false);

    const box1 = { id: 'box1', ref: useRef(null), name: "MDV", img: imgMoveOut };
    const box2 = { id: 'box2', ref: useRef(null), name: "CODEQ", img: imgFeelings };
    const box3 = { id: 'box3', ref: useRef(null), name: "METEO", img: imgWeather }
    const box4 = { id: 'box4', ref: useRef(null), name: "FILE-INFO", img: imgFileInfo }
    const box5 = { id: 'box5', ref: useRef(null), name: "INFO-VEH", img: imgVehicle }
    const box6 = { id: 'box6', ref: useRef(null), name: "DIALOG-WINDOW" }
    const box7 = { id: 'box7', ref: useRef(null), name: "ANCHOR-METEO", img: imgVehicle }
    const box8 = { id: 'box8', ref: useRef(null), name: "ANCHOR-CODEQ", img: imgVehicle }

    // CurrentRecognition
    const [currentRecognition, setCurrentRecognition] = useState(["...\n"]);
    const [historyRecognition, setHistoryRecognition] = useState(["...\n"]);
    const [isAudioOpen, setIsAudioOpen] = useState(false);

    // INFO
    const [currentAddressCockpit, setCurrentAddressCockpit] = useState('Adresse non définie');
    const [currentImmatCockpit, setCurrentImmatCockpit] = useState('Immat non définie');
    const [currentMDVCockpit, setCurrentMDVCockpit] = useState('MDV non défini');
    const [currentSentimentCockpit, setCurrentSentimentCockpit] = useState('Sentiment non défini');


    const [lines] = useState([
        {
            start: 'box6',
            end: 'box4',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: .05 },
        },
        {
            start: 'box4',
            end: 'box3',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
        },
        {
            start: 'box4',
            end: 'box5',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
        },
        {
            start: 'box6',
            end: 'box7',
            color: 'red',
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["left"],
            endAnchor: ["bottom"],
            headSize: 0
        },
        {
            start: 'box7',
            end: 'box1',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["bottom"],
            endAnchor: ["left"],
        },
        {
            start: 'box6',
            end: 'box8',
            color: 'red',
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["right"],
            endAnchor: ["bottom"],
            headSize: 0
        },
        {
            start: 'box8',
            end: 'box2',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["bottom"],
            endAnchor: ["right"],
        },
        {
            start: 'box6',
            end: 'box2',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            startAnchor: {
                position: "right"
            },
            endAnchor: {
                position: "right"
            },
            curveness: 20
        },
        {
            start: 'box6',
            end: 'box4',
            color: 'orange',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            startAnchor: ["top"],
            endAnchor: ["bottom"],
            path: "straight",
        },
    ]);

    function handlerShowModal() {
        let seconds = 0;
        setStartCoundown(true);
        setShowModal(!showModal);
        setInterval(() => {
            seconds++;
            if (seconds > hoursMinSecs.seconds + 1) {
                setShowMainWindow(true);
            }
        }, 1000);
    }

    return (
        <div className="center">
            <Fragment>
                {showModal && <Modal
                    show={showModal}
                    img={img}
                    handlerShowModal={handlerShowModal}
                    hanlerIsAudioOpen={setIsAudioOpen}
                />}

                {startCoundown && <Countdown hoursMinSecs={hoursMinSecs} countdownType="sec" />}

                {showMainWindow &&
                    <section className={"cockpit-grid" + duringPopUp} id="canvas">
                        <Box box={box1}
                            mdv={currentMDVCockpit}
                        />
                        <Box box={box2}
                            sentiment={currentSentimentCockpit} />
                        <Box box={box3}
                        />
                        {/* FILE INFO */}
                        <Box box={box4}
                            address={currentAddressCockpit}
                            immat={currentImmatCockpit} />

                        <Box box={box5} />
                        <MainBox box={box6}
                            currentRecognition={currentRecognition}
                            historyRecognition={historyRecognition}
                        />
                        <Box box={box7} />
                        <Box box={box8} />

                        <div className={duringPopUp}>
                            <Xarrow {...lines[0]} />
                            <Xarrow {...lines[1]} />
                            <Xarrow {...lines[2]} />
                            <Xarrow {...lines[3]} />
                            <Xarrow {...lines[4]} />
                            <Xarrow {...lines[5]} />
                            <Xarrow {...lines[6]} />
                        </div>
                    </section>
                }

                <div className="content-flex content-flex__justify-center">
                    <VoiceRecognition
                        isAudioOpen={isAudioOpen}
                        currentRecognitionCockpit={setCurrentRecognition}
                        historyRecognitionCockpit={setHistoryRecognition}
                        currentAddressCockpit={setCurrentAddressCockpit}
                        currentImmatCockpit={setCurrentImmatCockpit}
                        currentMDVCockpit={setCurrentMDVCockpit}
                        currentSentimentCockpit={setCurrentSentimentCockpit}
                    />
                </div>

            </Fragment>

        </div>

    )
}

export default CockpitGrid;