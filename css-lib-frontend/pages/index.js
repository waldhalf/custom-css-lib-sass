// REACT
import { Fragment } from 'react';

import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

// NEXT
import dynamic from "next/dynamic";

// OWN
const Header = dynamic(() => import('../components/layout/Header.js'), {
  ssr: false,
});
import Footer from '../components/layout/Footer';
import CardHome from '../components/card-home/CardHome';


export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Accueil du site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Header title="Bienvenue au showroom Imal@b" subtitle="L'assistance de demain, dès aujourd'hui" />


        <div className="content-flex content-flex__justify-between content-flex__stretch">

          {/* <div className={styles.card}>
            <Link href="/cockpit">
              <a className={styles.index__link}>Démo Uberduck &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/play-video">
              <a className={styles.index__link}>Démo live &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/handsfree_index.html">
              <a className={styles.index__link}>Démo Hansdfree &rarr;</a>
            </Link>
          </div> */}


          <CardHome
            image={'/images/uberduck.jpg'}
            url={'/uberduck'}
            title={'Parlez, et nous traduisons'}
            desc={"Grâce à l'intelligence atificielle nous pouvons comprendre ce que vous dîtes en temps réel et le traduire à la volée afin d'être énoncé avec une autre voix que la votre. "}

          />
          <CardHome
            image={'/images/tts.jpg'}
            url={'/play-video'}
            title={"Et si on travaillait ensemble?"}
            desc={"Quand l'intelligence artificielle vient donner des outils complémentaires au chargé d'assistance."} />

          <CardHome
            image={'/images/hands.jpg'}
            url={'/handsfree_index.html'}
            title={"Oublions la souris un instant..."}
            desc={"Grâce à la webcam nous regardons vos mains et vous pouvez intérargir avec le PC avec ces dernières."} />



        </div>




        <Footer />
      </main>
    </Fragment>
  )
}
