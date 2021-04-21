// SPA
// SSR
// SSG

import { useEffect } from "react"

export default function Home(props) {

    console.log(props.episodes);

    //Requisição modelo SPA
    // Roda no JS do browser
    // useEffect(() => {
    //     fetch('http://localhost:3333/episodes')
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    // }, [])

    


    return (
        <h1> Index </h1>
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
export async function getStaticProps() {

    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json();
    console.log(data);

    return {
        props: {
            episodes: data
        },
        // de quanto em quanto tempo
        // será gerada uma nova versão da página
        revalidate: 60 * 60 * 8,
    }
}