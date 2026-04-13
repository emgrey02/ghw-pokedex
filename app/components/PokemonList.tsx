import { Suspense } from 'react';
import PokemonButton from './PokemonButton';
import Loading from './Loading';

export default async function PokemonList(props: {
    pagePromise: Promise<{ page: number }>;
}) {
    const pageNumObj = await props.pagePromise;
    const page = pageNumObj.page;
    const options: RequestInit = {
        method: 'GET',
        cache: 'force-cache',
    };

    async function getCurrentPokemon(page: number) {
        let offset: number;

        if (page > 1) {
            offset = Number(page - 1) * 16;
        } else {
            offset = 0;
        }

        const url = `https://pokeapi.co/api/v2/pokemon/?limit=16&offset=${offset}`;

        const pokemonUrls = await fetch(url, options).then((res) => res.json());
        console.log(pokemonUrls);

        const pokemon = await Promise.all(
            pokemonUrls.results.map((p) => getOnePokemon(p.url)),
        );
        return pokemon;
    }

    async function getOnePokemon(url: string) {
        const res = await fetch(url, options);
        return res.json();
    }

    const pokemonList = await getCurrentPokemon(page);
    console.log(pokemonList);

    return (
        <ul
            id='listComp'
            className={`w-full grid grid-cols-2 sm:grid-cols-4 overflow-scroll ring-2 ring-indigo-800/80 my-2 p-2 rounded place-items-center`}
        >
            {pokemonList.map((poke, index) => (
                <li
                    className='w-fit px-4 py-2 flex flex-col items-center'
                    key={index}
                >
                    <PokemonButton
                        poke={poke}
                        index={index}
                    />
                </li>
            ))}
        </ul>
    );
}
