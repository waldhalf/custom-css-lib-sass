// REACT
import { Fragment } from 'react';

// NEXT JS
import dynamic from "next/dynamic";
import Head from "next/head";
// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});

import CockpitGrid from '../../components/cockpit/CockpitGrid.js';


function Cockpit() {
    return (<Fragment>
        <Head>
            <title>Cockpit</title>
            <meta name="description" content="Ce qui l'IA peut appoter au chargé d'assistance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
            <Header title="Cockpit" subtitle="La voix digitale" />
            <CockpitGrid />
        </div>
    </Fragment>)
}

export default Cockpit;