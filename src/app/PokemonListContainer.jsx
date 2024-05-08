'use client';
import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';
import PokeInfo from './PokeInfo';
import PokemonList from './PokemonList';
import PokemonSearch from '@/app/PokemonSearch';

import PaginationBar from '@/app/PaginationBar';

export default function PokemonListContainer({ pokemonList }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const clickedPoke = useRef(null);

    const [showInfo, setShowInfo] = useState(false);

    const setQuery = (name) => {
        const params = new URLSearchParams(searchParams);
        console.log('setting query');
        params.set('query', name);
        router.push(pathname + '?' + params.toString());
    };

    const showPokeInfoFromSearch = (data) => {
        clickedPoke.current = data;
        setQuery(data.name);
    };

    function setSelectedPoke(poke) {
        console.log('setting selected poke');
        clickedPoke.current = poke;
    }

    function hidePokeInfo() {
        console.log('removing query');
        params.delete('query');
        router.push(pathname);
    }

    useEffect(() => {
        if (params.has('query') && clickedPoke.current === null) {
            console.log('currentPoke name defined in url');
            let name = params.get('query');
            console.log(name);

            async function getPokemonFromSearch(name) {
                if (name === '') {
                    return 'invalid search';
                }

                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`,
                );

                if (!res.ok) {
                    return `That's not a pokemon. Try searching again.`;
                }
                const pokemon = await res.json();
                return pokemon;
            }

            getPokemonFromSearch(params.get('query')).then((result) => {
                if (typeof result === 'object') {
                    console.log(result);
                    clickedPoke.current = result;
                }
            });
        }

        if (params.has('query')) {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [params]);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <PokemonSearch onDataFromChild={showPokeInfoFromSearch} />
            </Suspense>
            <>
                <div
                    className={`w-full flex justify-between items-center place-self-center md:hidden`}
                >
                    <PaginationBar />
                </div>
                <Suspense fallback={<Loading />}>
                    {showInfo ?
                        <PokeInfo
                            poke={clickedPoke.current}
                            hideInfo={hidePokeInfo}
                            key={clickedPoke.current}
                        />
                    :   <PokemonList
                            pokeList={pokemonList}
                            setSelectedPoke={setSelectedPoke}
                        />
                    }
                </Suspense>
                {showInfo || (
                    <div
                        className={`w-full flex justify-between items-center place-self-center`}
                    >
                        <PaginationBar />
                    </div>
                )}
            </>
        </>
    );
}
