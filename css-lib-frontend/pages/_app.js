// REACT
import React from 'react';

//OWN
import Layout from '../components/layout/layout';
import '../styles/main.scss'


function MyApp({ Component, pageProps }) {
  return (<Layout>
    <Component {...pageProps} />
  </Layout>)

}

export default MyApp
