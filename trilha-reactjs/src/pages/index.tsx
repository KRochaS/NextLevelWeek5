import {GetStaticProps } from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
// import { useEffect } from "react"

type Episode = {
    id: string,
    title: string;
    members: string;
    published_at: string;
}
type HomeProps = {
    episodes:  Episode[],
}

export default function Home(props: HomeProps) {

    console.log(props.episodes);

    //Requisição modelo SPA
    // Roda no JS do browser
    // useEffect(() => {
    //     fetch('http://localhost:3333/episodes')
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    // }, [])

    


    return (
        <div>
            <h1> Index </h1>
            <p> { JSON.stringify(props.episodes)}</p>
        </div>
    )
}


 // SSR
// Executa toda vez que a tela home é acessada
// export async function getServerSideProps() {

//     const response = await fetch('http://localhost:3333/episodes')
//     const data = await response.json();
//     console.log(data);

//     return {
//         props: {
//             episodes: data
//         }
//     }
// }

// SSG
// Cria uma versão estática da página (HTML puro)
// é servido para todos os usuários depois do primeiro usuário acessar
export const getStaticProps: GetStaticProps = async () => {

    const { data } =  await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc',
        }
    })

    const episodes = data.map(episode => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
            description: episode.description,
            url: episode.file.url,
        }
    })
  
    return {
        props: {
            episodes
        },
        // de quanto em quanto tempo
        // será gerada uma nova versão da página
        revalidate: 60 * 60 * 8,
    }
}