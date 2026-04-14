'use client';

import SearchResults from './SearchResults';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';
import PaginationBar from './PaginationBar';
import PokemonButton from './PokemonButton';
import { useSearchParams } from 'next/navigation';

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const query = searchParams.get('query');

    const options: RequestInit = {
        method: 'GET',
        cache: 'force-cache',
    };

    useEffect(() => {
        setIsLoading(true);
        async function getOnePokemon(url: string) {
            const res = await fetch(url, options);
            return res.json();
        }

        async function getCurrentPokemon(page: number) {
            let offset: number;

            if (page > 1) {
                offset = Number(page - 1) * 16;
            } else {
                offset = 0;
            }

            const url = `https://pokeapi.co/api/v2/pokemon/?limit=16&offset=${offset}`;

            const pokemonUrls = await fetch(url, options).then((res) =>
                res.json(),
            );
            setTotalPages(Math.ceil(pokemonUrls.count / 16));

            const pokemon = await Promise.all(
                pokemonUrls.results.map((p) => getOnePokemon(p.url)),
            );
            setPokemonList(pokemon);
        }

        getCurrentPokemon(+page).then(() => setIsLoading(false));
    }, [page]);

    return (
        <>
            {query ?
                <SearchResults
                    page={+page}
                    query={query}
                />
            :   <>
                    <div
                        className={`flex justify-center items-center place-self-center my-2`}
                    >
                        <PaginationBar totalPages={totalPages} />
                    </div>
                    {isLoading ?
                        <Loading />
                    :   <ul
                            className={`w-[80vw] max-w-187.5 grid grid-cols-2 sm:grid-cols-4 overflow-scroll ring-2 ring-indigo-800/80 my-2 p-2 rounded place-items-center`}
                        >
                            <>
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
                            </>
                        </ul>
                    }

                    <div
                        className={`w-full flex justify-between items-center place-self-center md:hidden`}
                    >
                        <PaginationBar totalPages={totalPages} />
                    </div>
                </>
            }
        </>
    );
}
