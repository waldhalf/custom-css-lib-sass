// REACT
import { Fragment } from 'react';

import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.scss';

// NEXT
import dynamic from "next/dynamic";

// OWN
const Header = dynamic(() => import('../components/layout/Header.js'), {
  ssr: false,
});


export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Accueil du site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header title="Ma librairie components/sass à moi!" subtitle="Où comment se faire son propre framework" />

        <div className={styles.grid}>

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
            <Link href="/get-audio">
              <a className={styles.index__link}>Get Audio &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/play-video">
              <a className={styles.index__link}>Video Player &rarr;</a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/buttons">
              <a className={styles.index__link}>Buttons &rarr;</a>
            </Link>
          </div>


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.google.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Moi
        </a>
      </footer>
    </Fragment>
  )
}
