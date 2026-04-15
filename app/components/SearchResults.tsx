'use client';
import { useEffect, useState } from 'react';
import PaginationBar from './PaginationBar';
import PokemonButton from './PokemonButton';
import Loading from '../loading';

export default function SearchResults(props: { page: number; query: string }) {
    const page = props.page;
    const query = props.query;

    const [pokemonList, setPokemonList] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const options: RequestInit = {
            method: 'GET',
            next: {
                revalidate: 60 * 60 * 24,
            },
        };

        async function getAllPokemon() {
            let pokemonUrls = [];
            let offset = 20;
            let stillPokemon = true;

            while (stillPokemon) {
                const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;

                const pokeUrls = await fetch(url, options).then((res) =>
                    res.json(),
                );

                if (!pokeUrls.next) {
                    stillPokemon = false;
                }

                if (pokemonUrls.length == 0) {
                    pokemonUrls = pokeUrls.results;
                } else {
                    pokemonUrls = pokemonUrls.concat(pokeUrls.results);
                }
                offset += 20;
            }
            return pokemonUrls;
        }

        async function getOnePokemon(url: string) {
            const res = await fetch(url, options);

            if (!res.ok) {
                console.error('error getting this pokemon', res.url);
            } else {
                return res.json();
            }
        }

        async function filterSearch() {
            let offset = 0;
            const pokes = await getAllPokemon();
            const filteredPokes = pokes.filter((p) => {
                return p.name.includes(query.toLowerCase());
            });
            const pokemon = await Promise.all(
                filteredPokes.map((p) => getOnePokemon(p.url)),
            );
            setTotalPages(Math.ceil(pokemon.length / 16));

            if (page > 1) {
                offset = Number(page) * 16;
            } else {
                offset = 16;
            }
            setPokemonList(pokemon.slice(offset - 16, offset));
        }

        filterSearch().then(() => setIsLoading(false));
    }, [query, page]);

    return (
        <>
            {query && (
                <>
                    <div className={`flex justify-center items-center my-2`}>
                        <PaginationBar totalPages={totalPages} />
                    </div>
                    {isLoading ?
                        <Loading />
                    :   <div className='flex justify-center'>
                            <ul
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
                        </div>
                    }
                    <div
                        className={`w-full flex justify-between items-center md:hidden`}
                    >
                        <PaginationBar totalPages={totalPages} />
                    </div>
                </>
            )}
        </>
    );
}
