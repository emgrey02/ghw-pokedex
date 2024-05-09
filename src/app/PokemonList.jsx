'use client';
import PokemonButton from './PokemonButton';
import Loading from './Loading';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PokemonList({ pokeList, setSelectedPoke }) {
    const searchParams = useSearchParams();

    const [pokemonList, setPokemonList] = useState(pokeList);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let page = searchParams.get('page');
        console.log(page);

        async function getCurrentPokemon(page) {
            let offset;

            async function getOnePokemon(url) {
                const res = await fetch(url);
                return res.json();
            }

            if (page > 1) {
                offset = Number(page - 1) * 16;
            } else {
                offset = 0;
            }

            const url = `https://pokeapi.co/api/v2/pokemon/?limit=16&offset=${offset}`;

            const pokemonUrls = await fetch(url).then((res) => res.json());

            const pokemon = await Promise.all(
                pokemonUrls.results.map((p) => getOnePokemon(p.url)),
            );
            setPokemonList(pokemon);
            setLoading(false);
        }

        getCurrentPokemon(page);
    }, [searchParams]);

    function setPoke(poke) {
        console.log('setting poke from pokemonList');
        setSelectedPoke(poke);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <ul
            id='listComp'
            className={`w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 overflow-scroll ring-2 ring-indigo-300 dark:ring-indigo-950 my-2 p-2 rounded `}
        >
            {pokemonList.map((poke, index) => (
                <li
                    className='flex flex-col items-center hover:dark:text-gray-300 hover:text-gray-950 hover:font-semibold py-3 hover:ring-slate-500 hover:dark:ring-slate-950/60 rounded-lg hover:shadow-lg hover:shadow-slate-500/60 hover:dark:shadow-slate-900/80 hover:bg-sky-300/40 hover:dark:bg-indigo-900/20 focus:outline-0 focus:ring-2 ring-slate-600 dark:ring-slate-300 transition-all'
                    key={index}
                >
                    <PokemonButton
                        poke={poke}
                        index={index}
                        sendCurrentPoke={setPoke}
                    />
                </li>
            ))}
        </ul>
    );
}
