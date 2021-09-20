import Countdown from "../../components/countdown/index.js";

function Test() {
    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 30 };
    return (<div>
        <Countdown hoursMinSecs={hoursMinSecs} countdownType="sec" />
    </div>)
}

export default Test;