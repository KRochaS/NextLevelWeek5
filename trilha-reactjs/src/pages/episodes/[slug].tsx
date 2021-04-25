import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './episode.module.scss';
import {useRouter } from 'next/router';

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    description: string,
    members: string,
    duration: string,
    url: string,
    publishedAt: string,
    durationAsString: string,
}
type EpisodeProps = {
    episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
    
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href={`/`}>
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar" />
                </button>
                
                </Link>
                <Image width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover" />
                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span> {episode.members}</span>
                <span> {episode.publishedAt}</span>
                <span> {episode.durationAsString}</span>
            </header>


            {/* 
                dangerouslySetInnerHTML = seta os dados do back  que vem já
                com a tag p em  HTML

            */}
            <div className={styles.description} dangerouslySetInnerHTML={ {__html: episode.description}}/>
               
        
        </div>
    )
}


// aula 3 - 3:53 até 23:29
// client (browser) - next.js(node.js) - server(back-end)
//      true              blocking
//                   SEO - Melhor opção
export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await api.get('episodes', {
        params: {
          _limit: 2,
          _sort: 'published_at',
          _order: 'desc',
        }
      })

      const paths = data.map(episode => {
        return {
          params: {
            slug: episode.id,
          }
        }
      })
      
    return {
         //paths = Paginas geradas na hora do build
        paths,
        fallback: 'blocking'
        //  Espera carregamento da página (incremental static regeneration)
        //  false, apresenta erro 404
        //  blocking,página é exibida apenas quando os dados estiverem carregados (incremental static regeneration)
    }
}

// ctx = contexto;
export const getStaticProps: GetStaticProps = async (ctx) => {
    // slug do arquivo [slug] - mesmo nome;

    const { slug } = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
        members: data.members,
    };
    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24, // 24 hours
    }
}