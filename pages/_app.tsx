import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'bastianparedes/styles/global.css';
import 'bastianparedes/styles/normalize.css';
import '../styles/general.css';
import nextConfig from '../next.config';

const _App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link href={nextConfig.basePath + '/favicon.ico'} rel="icon" />
        <title>Bastián Paredes</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default _App;
