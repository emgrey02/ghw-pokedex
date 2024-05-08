import PokemonListContainer from '@/app/PokemonListContainer';
import LoadingPage from '@/app/LoadingPage';
import Image from 'next/image';
import dex from '../../public/pokeDEX.png';

import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

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

        const pokemonUrls = await fetch(url, { cache: 'no-store' }).then(
            (res) => res.json(),
        );
        const pokemon = await Promise.all(
            pokemonUrls.results.map((p) => getOnePokemon(p.url)),
        );
        return pokemon;
    }

    async function getOnePokemon(url) {
        const res = await fetch(url);
        return res.json();
    }

    const pokemonList = await getCurrentPokemon(pageNum);

    return (
        <main
            id='main'
            className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 transition-all info`}
        >
            <div className='flex gap-2 items-center'>
                <Image
                    priority
                    width='80'
                    height='80'
                    alt='pokedex icon'
                    src={dex}
                />
                <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
            </div>
            <Suspense fallback={<LoadingPage />}>
                <PokemonListContainer pokemonList={pokemonList} />
            </Suspense>
        </main>
    );
}
