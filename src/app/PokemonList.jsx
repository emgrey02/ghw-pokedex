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
            className={`w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 overflow-scroll ring-2 ring-indigo-300 dark:ring-indigo-950 my-4 py-2 rounded`}
        >
            {pokemonList.map((poke, index) => (
                <li
                    className='flex flex-col justify-between items-center'
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
