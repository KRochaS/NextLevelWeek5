import { createContext, useState, ReactNode } from 'react';


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number;
    isPlaying: boolean,
    play: (episode: Episode) => void;
    tooglePlay: () => void;
    setPlayingState: (state: boolean) => void;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}
export const PlayerContext = createContext({} as PlayerContextData);



export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);


    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function tooglePlay() {

        setIsPlaying(!isPlaying);

    }

    function setPlayingState(state) {
        setIsPlaying(state);
    }


    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            isPlaying,
            play,
            tooglePlay,
            setPlayingState
        }
        }>
            {children}
        </PlayerContext.Provider>
    )
}