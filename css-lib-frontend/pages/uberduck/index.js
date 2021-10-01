// REACT
import { Fragment } from 'react';

// NEXT JS
import dynamic from "next/dynamic";
import Head from 'next/head';
import UberduckComponent from '../../components/uberduck/index.js';

// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});
function Uberduck() {
    return (<Fragment>
        <Head>
            <title>Uberduck</title>
            <meta name="description" content="Ce qui l'IA peut appoter au chargé d'assistance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
            <Header title="Uberduck" subtitle="Laissez l'IA vous parler..." />
            <UberduckComponent />
        </div>
    </Fragment>)
}

export default Uberduck;