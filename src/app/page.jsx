'use client'
import PokemonListContainer from '@/app/PokemonListContainer';
import Image from 'next/image';
import dex from '../../public/pokeDEX.png';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const params = useSearchParams();
    const pageNum = params.get('page');

    const [isInfoShowing, setIsInfoShowing] = useState(false);
    
    const handleDataFromChild = (data) => {
        setIsInfoShowing(data);
    }

    return (
        <Suspense>
            <main id='main' className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 ${isInfoShowing ? 'yes-info' : 'no-info'}`}> 
                <div className='flex gap-2 items-center'>
                    <Image width='80' height='80' alt='pokedex icon' src={dex}/>
                    <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                </div>
                <PokemonListContainer page={pageNum} onDataFromChild={handleDataFromChild} />
            </main>
        </Suspense>
	);
}