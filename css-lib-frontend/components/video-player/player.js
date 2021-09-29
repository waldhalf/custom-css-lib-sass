// REACT
import { useState, Fragment } from "react";

// NEXTJS
import Link from 'next/link';
// THIRD PARTY
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'

function VideoPlayer(props) {
    const [videoPlay, setVideoPlay] = useState(false);
    const [videoPause, setVideoPause] = useState(true);

    const playVideo = () => {
        setVideoPlay(true);
        setVideoPause(false);
    }

    const pauseVideo = () => {
        setVideoPlay(false);
        setVideoPause(true);
    }

    return (
        <Fragment>
            <div className="center">
                <ReactPlayer
                    url={props.video}
                    width='80%'
                    height='80%'
                    playing={videoPlay}
                />
            </div>
            <div className="content-flex content-flex__justify-center mt-10">
                <button className="video-player__button video-player__button--play" onClick={playVideo}></button>
                <div className="mr-15 ml-15"></div>
                <button className="video-player__button video-player__button--pause" onClick={pauseVideo}></button>
            </div>
            <div className="content-flex content-flex__justify-end">
                <Link href="/cockpit">
                    <a className="video-player__button-next--simple-hover video-player__button-next content-flex content-flex__justify-around">
                        <FontAwesomeIcon icon={faPhone} /> IMA
                    </a>
                </Link>
            </div>

        </Fragment >)
}

export default VideoPlayer;