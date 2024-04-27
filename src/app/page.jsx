'use client'
import PokemonListContainer from '@/app/PokemonListContainer';
import Loading from '@/app/loading';
import Image from 'next/image';
import dex from '../../public/pokeDEX.png';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Page(searchParams) {
    const pageNum = searchParams.page || 1;

    const [isInfoShowing, setIsInfoShowing] = useState(false);

    function setInfo(isInfo) {
        setIsInfoShowing(isInfo);
    }

    return (
        <main id='main' className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 transition-all ${isInfoShowing ? 'yes-info' : 'no-info'}`}> 
                <div className='flex gap-2 items-center'>
                    <Image width='80' height='80' alt='pokedex icon' src={dex}/>
                    <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                </div>
                <Suspense fallback={Loading}>
                    <PokemonListContainer setInfo={setInfo} page={pageNum} />
                </Suspense>
            </main>
	);
}