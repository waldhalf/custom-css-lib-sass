// REACT
import { Fragment, useEffect } from 'react';

// NEXT
import dynamic from "next/dynamic";

// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});



import GetAudioGrid from '../../components/get-audio/GetAudioGrid';

function GetAudio() {

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition;
        // const mic = new SpeechRecognition();
    }, []);

    return (<Fragment>
        <Header title="Get Audio" subtitle="Manipulation d'un stream audio" />
        <GetAudioGrid />
    </Fragment>
    )
}

export default GetAudio;