// NEXT JS
import dynamic from "next/dynamic";

// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});
import VideoPlayer from "../../components/video-player/player.js";

function PlayIntroductionVideo() {

    // URL des videos local
    const videoUrlList = [
        '/videos/540/Gas-Problem.mp4',
        '/videos/540/Flat-Tire.mp4',
        '/videos/540/Flat-Battery.mp4'
    ]

    const video = videoUrlList[Math.floor(Math.random() * videoUrlList.length)];
    return (<div className="container">
        <Header title="Imaginez..." subtitle="un monde pas si éloigné que ça..."></Header>
        <div className="container">
            <VideoPlayer video={video}></VideoPlayer>
        </div>
    </div>)
}

export default PlayIntroductionVideo;