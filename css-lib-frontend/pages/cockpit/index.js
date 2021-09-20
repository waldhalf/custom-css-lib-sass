// REACT
import { Fragment } from 'react';

// NEXT JS
import dynamic from "next/dynamic";

// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});

import CockpitGrid from '../../components/cockpit/CockpitGrid.js';


function Cockpit() {
    return (<Fragment>
        <Header title="Cockpit" subtitle="La voix digitale" />
        <CockpitGrid />
    </Fragment>)
}

export default Cockpit;