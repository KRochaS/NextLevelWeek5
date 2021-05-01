import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles.module.scss';

export function Header() {

    const { isDarkMode, darkMode } = useContext(ThemeContext);

    const currentDate = format(new Date(), 'EEEEEE, d, MMM', {
		locale: ptBR,
	});

    function handleIsThemeDark() {
        darkMode();
    }


    return (
        <header className={styles.headerContainer}>
            <img src={!isDarkMode ? `/logo.svg` : `/logo-dark.svg`} alt="Podcastr"/>

            <p> O melhor para você ouvir, sempre </p>

            <span> {currentDate} </span>

             
            <button type="button" onClick={handleIsThemeDark}>
                <img src={!isDarkMode ? `/moon.svg` : `/sun.svg`} alt="moonOrSun" />
            </button>
        </header>
    );
}