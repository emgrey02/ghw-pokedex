'use client';
import PokemonList from './PokemonList';
import PaginationBar from './PaginationBar';
import { Suspense } from 'react';
import Loading from './Loading';

export default function PokemonListContainer({ pokemonList }) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <div
                    className={`w-full flex justify-between items-center place-self-center`}
                >
                    <PaginationBar />
                </div>
            </Suspense>

            <Suspense fallback={<Loading />}>
                <PokemonList pokeList={pokemonList} />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <div
                    className={`w-full flex justify-between items-center place-self-center md:hidden`}
                >
                    <PaginationBar />
                </div>
            </Suspense>
        </>
    );
}
