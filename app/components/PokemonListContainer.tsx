'use client';
import PokemonList from './PokemonList';
import PaginationBar from './PaginationBar';
import { Suspense } from 'react';
import LoadingPage from './LoadingPage';

export default function PokemonListContainer({ pokemonList }) {
    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <div
                    className={`w-full flex justify-between items-center place-self-center`}
                >
                    <PaginationBar />
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPage />}>
                <PokemonList pokeList={pokemonList} />
            </Suspense>

            <Suspense fallback={<LoadingPage />}>
                <div
                    className={`w-full flex justify-between items-center place-self-center md:hidden`}
                >
                    <PaginationBar />
                </div>
            </Suspense>
        </>
    );
}
