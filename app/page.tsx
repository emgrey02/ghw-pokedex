import Image from 'next/image';
import Footer from './components/Footer';

import PokemonListContainer from './components/PokemonListContainer';

export default async function Page(searchParams) {
    const pageNum = searchParams.page || 1;

    async function getCurrentPokemon(page) {
        let offset;

        if (page > 1) {
            offset = Number(page - 1) * 16;
        } else {
            offset = 0;
        }

        const url = `https://pokeapi.co/api/v2/pokemon/?limit=16&offset=${offset}`;

        const pokemonUrls = await fetch(url).then((res) => res.json());
        const pokemon = await Promise.all(
            pokemonUrls.results.map((p) => getOnePokemon(p.url))
        );
        return pokemon;
    }

    async function getOnePokemon(url) {
        const res = await fetch(url);
        return res.json();
    }

    const pokemonList = await getCurrentPokemon(pageNum);

    return (
        <>
            <main
                id='main'
                className={`text-slate-800 info md:w-[700px]`}
            >
                <PokemonListContainer pokemonList={pokemonList} />
            </main>
            <Footer />
        </>
    );
}
