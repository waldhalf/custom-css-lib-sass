// REACT
import { useState } from 'react';

// THIRD PARTY
import axios from 'axios';
// OWN
import ButtonPressable from "../buttons/ButtonPressable";
import Countdown from '../countdown';
import PageCahier from '../PageCahier';

import VoiceRecognitionPageCahier from '../PageCahier/VoiceRecognitionPageCahier';

function UberduckComponent() {

    // Countdown
    const [startCoundown, setStartCoundown] = useState(false);
    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 1 };

    // Customer Speech
    const [historyRecognition, SetHistoryRecognition] = useState(['']);
    const [historyRecognitionEn, SetHistoryRecognitionEn] = useState(['']);

    function handlerCountdown() {
        setStartCoundown(!startCoundown);
    }

    return (<div className="container">
        <div className="content-flex content-flex__justify-center mt-100 " onClick={handlerCountdown}>
            <VoiceRecognitionPageCahier
                cssClass="btn__pressable--blue"
                customerSpeech={SetHistoryRecognition}
                customerSpeechEn={SetHistoryRecognitionEn} />
        </div>
        {startCoundown && <Countdown hoursMinSecs={hoursMinSecs} countdownType="sec" />}

        {startCoundown && <div className="content-flex content-flex__justify-evenly mt-50 mb-50">
            <PageCahier
                placeholder="Votre texte en français."
                text={historyRecognition}></PageCahier>
            <PageCahier
                placeholder="Votre texte traduit en anglais."
                text={historyRecognitionEn}></PageCahier>
        </div>}
    </div>)
}

export default UberduckComponent;