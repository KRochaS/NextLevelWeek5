import { createContext, ReactNode, useState } from 'react';

interface ThemeContextData {
    isDarkMode: boolean;
    darkMode: () => void;
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {

    const [isDarkMode, setDarkMode] = useState(false);


    function darkMode() {
        setDarkMode(!isDarkMode);
        if(!isDarkMode) {
            document.body.classList.add('dark-mode');

        }else {
            
            document.body.classList.remove('dark-mode');
        }
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, darkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

