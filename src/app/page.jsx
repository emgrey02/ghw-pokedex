'use client'
import PokemonListContainer from '@/app/PokemonListContainer' 
import Button from '@/app/Button';
import { getPokemon } from '@/app/pokeService';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Page() {
    const [isInfoShowing, setIsInfoShowing] = useState(false);
    
    const handleDataFromChild = (data) => {
        setIsInfoShowing(data);
    }

    return (
        <>
            <main id='main' className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 ${isInfoShowing ? 'yes-info' : 'no-info'}`}> 
                <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                <PokemonListContainer onDataFromChild={handleDataFromChild} />
            </main>
        </>
	);
}