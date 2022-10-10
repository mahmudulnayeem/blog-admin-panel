import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import React from 'react';
export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Admin panel</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}