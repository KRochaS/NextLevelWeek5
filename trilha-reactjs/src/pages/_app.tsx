import '../styles/global.scss';

import React from 'react';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {

    return (


        <ThemeProvider>
            <PlayerContextProvider>
                <div className={styles.wrapper}>

                    <main>
                        <Header />
                        <Component {...pageProps} />
                    </main>

                    <Player />
                </div>
            </PlayerContextProvider>
        </ThemeProvider>


    );
}

export default MyApp
