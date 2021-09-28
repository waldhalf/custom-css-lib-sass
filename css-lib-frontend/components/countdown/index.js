import { useState, useEffect } from 'react';

function Countdown(props) {
    const { hours, minutes, seconds } = props.hoursMinSecs;
    const countdownType = props.countdownType;
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    const [finish, setFinish] = useState(false);

    const tick = () => {
        if (hrs === 0 && mins === 0 && secs === 0) {
            setFinish(true);
        }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };

    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return <div className="container">

        {!finish && <div className="countdown">
            <p className="countdown__text">Attendez quelques secondes que je me connecte...</p>
            {countdownType == 'sec' && <p className="countdown__numbers">{`${secs.toString().padStart(2, '0')}`}</p>}
            {countdownType == 'minsec' && <p className="countdown__numbers">{`00:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>}
            {countdownType == 'hminsec' && <p className="countdown__numbers">{`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>}
        </div>
        }
    </div>
}

export default Countdown;