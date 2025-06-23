import PokemonButton from './PokemonButton';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PokemonList({ pokeList }) {
    const searchParams = useSearchParams();
    const [pokemonList, setPokemonList] = useState(pokeList);

    useEffect(() => {
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
                pokemonUrls.results.map((p) => getOnePokemon(p.url))
            );
            setPokemonList(pokemon);
        }

        getCurrentPokemon(page);
    }, [searchParams]);

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
