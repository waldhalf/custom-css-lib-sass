// REACT
import { useState } from 'react';

// OWN
import ButtonPressable from "../buttons/ButtonPressable";
import Countdown from '../countdown';
import PageCahier from '../PageCahier';
function UberduckComponent() {

    // Countdown
    const [startCoundown, setStartCoundown] = useState(false);
    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 1 };

    function handlerCountdown() {
        setStartCoundown(true);
    }

    function resetCountdown() {
        setStartCoundown(false);
    }

    return (<div className="container">
        {!startCoundown && <div className="content-flex content-flex__justify-center mt-100" onClick={handlerCountdown}>
            <ButtonPressable placeholder="Votre texte en français" text="Commencer" />
        </div>}
        {startCoundown && <Countdown hoursMinSecs={hoursMinSecs} countdownType="sec" />}

        {startCoundown && <div className="content-flex content-flex__justify-evenly mt-50 mb-50">
            <PageCahier placeholder="Votre texte en français."></PageCahier>
            <PageCahier placeholder="Votre texte traduit en anglais."></PageCahier>

        </div>}
        {startCoundown &&
            <div className="content-flex content-flex__justify-center mt-20" onClick={resetCountdown}>
                <ButtonPressable text="Recommencer" />
            </div>}


    </div>)
}

export default UberduckComponent;