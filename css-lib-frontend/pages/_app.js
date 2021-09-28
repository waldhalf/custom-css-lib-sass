// REACT
import React from 'react';

//OWN
import Layout from '../components/layout/layout';
import '../styles/main.scss'

// CONTEXT
import { AppWrapper } from '../components/context/state';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )

}

export default MyApp
