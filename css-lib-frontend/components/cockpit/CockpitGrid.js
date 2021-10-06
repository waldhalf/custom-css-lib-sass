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
            conducteur={props.conducteur}
            assureur={props.assureur}
            tires={props.tires}
            immat={props.immat}
            mdv={props.mdv}
            sentiment={props.sentiment}
            panne={props.panne}
            weather={props.weather}
        />
    );
};

const MainBox = (props) => {
    return (
        <CockpitDialogWindow
            myRef={props.box.ref}
            id={props.box.id}
            name={props.box.name}
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

    const boxMDV = { id: 'boxMDV', ref: useRef(null), name: "MDV", img: imgMoveOut };
    const boxCODEQ = { id: 'boxCODEQ', ref: useRef(null), name: "CODEQ", img: imgFeelings };
    const boxMETEO = { id: 'boxMETEO', ref: useRef(null), name: "METEO", img: imgWeather }
    const boxEntities = { id: 'boxEntities', ref: useRef(null), name: "FILE-INFO", img: imgFileInfo }
    const boxDataVeh = { id: 'boxDataVeh', ref: useRef(null), name: "INFO-VEH", img: imgVehicle }
    const boxDIALOG_WINDOW = { id: 'boxDIALOG_WINDOW', ref: useRef(null), name: "DIALOG-WINDOW" }
    const boxANCHOR_METEO = { id: 'boxANCHOR_METEO', ref: useRef(null), name: "ANCHOR-METEO", img: imgVehicle }
    const boxANCHOR_CODEQ = { id: 'boxANCHOR_CODEQ', ref: useRef(null), name: "ANCHOR-CODEQ", img: imgVehicle }

    // CurrentRecognition
    const [currentRecognition, setCurrentRecognition] = useState(["...\n"]);
    const [historyRecognition, setHistoryRecognition] = useState(["...\n"]);
    const [isAudioOpen, setIsAudioOpen] = useState(false);

    // INFO
    const [currentAddressCockpit, setCurrentAddressCockpit] = useState('');
    const [currentIncidentCockpit, setCurrentIncidentCockpit] = useState('');
    const [currentImmatCockpit, setCurrentImmatCockpit] = useState('');
    const [currentMDVCockpit, setCurrentMDVCockpit] = useState('');
    const [currentSentimentCockpit, setCurrentSentimentCockpit] = useState('');
    const [currentConducteurCockpit, setCurrentConducteurCockpitt] = useState('');
    const [currentAssureurCockpit, setCurrentAssureurCockpit] = useState('');
    const [currentTiresCockpit, setCurrentTiresCockpit] = useState('');
    const [currentWeatherCockpit, setCurrentWeatherCockpit] = useState('');


    const [lines] = useState([
        {
            start: 'boxDIALOG_WINDOW',
            end: 'boxEntities',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: .05 },
        },
        {
            start: 'boxEntities',
            end: 'boxMETEO',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
        },
        {
            start: 'boxEntities',
            end: 'boxDataVeh',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
        },
        {
            start: 'boxDIALOG_WINDOW',
            end: 'boxANCHOR_METEO',
            color: 'red',
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["left"],
            endAnchor: ["bottom"],
            headSize: 0
        },
        {
            start: 'boxANCHOR_METEO',
            end: 'boxMDV',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["bottom"],
            endAnchor: ["left"],
        },
        {
            start: 'boxDIALOG_WINDOW',
            end: 'boxANCHOR_CODEQ',
            color: 'red',
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["right"],
            endAnchor: ["bottom"],
            headSize: 0
        },
        {
            start: 'boxANCHOR_CODEQ',
            end: 'boxCODEQ',
            color: 'red',
            headSize: 2,
            strokeWidth: 6,
            dashness: { animation: 0.3 },
            path: "smooth",
            startAnchor: ["bottom"],
            endAnchor: ["right"],
        },
        {
            start: 'boxDIALOG_WINDOW',
            end: 'boxCODEQ',
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
            start: 'boxDIALOG_WINDOW',
            end: 'boxEntities',
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
                        <Box box={boxMDV}
                            mdv={currentMDVCockpit}
                        />
                        <Box box={boxCODEQ}
                            sentiment={currentSentimentCockpit} />
                        <Box box={boxMETEO}
                            weather={currentWeatherCockpit}
                        />
                        {/* FILE INFO */}
                        <Box box={boxEntities}
                            address={currentAddressCockpit}
                        />

                        <Box box={boxDataVeh}
                            immat={currentImmatCockpit}
                            conducteur={currentConducteurCockpit}
                            assureur={currentAssureurCockpit}
                            tires={currentTiresCockpit} />
                        <MainBox box={boxDIALOG_WINDOW}
                            currentRecognition={currentRecognition}
                            historyRecognition={historyRecognition}
                        />
                        <Box box={boxANCHOR_METEO} />

                        <Box box={boxANCHOR_CODEQ} />

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
                        currentIncidentCockpit={setCurrentIncidentCockpit}
                        currentImmatCockpit={setCurrentImmatCockpit}
                        currentMDVCockpit={setCurrentMDVCockpit}
                        currentSentimentCockpit={setCurrentSentimentCockpit}
                        currentConducteurCockpit={setCurrentConducteurCockpitt}
                        currentAssureurCockpit={setCurrentAssureurCockpit}
                        currentTiresCockpit={setCurrentTiresCockpit}
                        currentWeatherCockpit={setCurrentWeatherCockpit}
                    />
                </div>

            </Fragment>

        </div>

    )
}

export default CockpitGrid;
