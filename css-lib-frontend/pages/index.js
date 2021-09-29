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

        <div className="vh-60 center">
          <div className={styles.card}>
            <Link href="/social-media-dashboard" >
              <a className={styles.index__link}>Dashboard Social Media &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/cockpit">
              <a className={styles.index__link}>Cockpit &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/play-video">
              <a className={styles.index__link}>Video Player &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/handsfree_index.html">
              <a className={styles.index__link}>Démo Hansdfree &rarr;</a>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </Fragment>
  )
}
