'use client'
import PokemonList from '@/app/PokemonList'
import { getPokemon, getAllPokemon } from '@/app/pokeService';
import { useState, useEffect, useRef, createContext } from 'react';

export const URLContext = createContext();

export default function Page() {
    const [currentUrl, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=25&offset=0');
    const generalList = useRef();
    const prevButton = useRef();
    const nextButton = useRef();
    
    useEffect(() => {
        
        async function getGeneralList() {
            let list = await getPokemon(currentUrl);
            generalList.current = list; 
            prevButton.current.disabled = isDisabled('prev');
            nextButton.current.disabled = isDisabled('next');
        } 
        getGeneralList();
        
    }, [currentUrl, prevButton, nextButton])
    
    function handleURLChange(e) {
        if (e.target.id === 'prev') {
            setUrl(generalList.current.previous);
        } else if (e.target.id === 'next') {
            setUrl(generalList.current.next);
        }
    }
    
    function isDisabled(currentButton) {
        if (currentButton === 'prev') {
            if (generalList.current.previous !== null) {
                return false;
            } else {
                return true;
            }
        } else {
            if (generalList.current.next !== null) {
                return false;
            } else {
                return true;
            }
        }
    }
    
    return (
        <URLContext.Provider value={{ currentUrl }}>
            <main className='flex w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-950 dark:to-slate-800 flex-col items-center justify-between p-24'>
                <h1>Pokedex</h1>
                <PokemonList updateList={getAllPokemon} />
                <div id='buttonContainer' className=" w-full flex justify-between">
                    <button className='w-50 text-slate-900 dark:text-slate-200 bg-transparent dark:bg-transparent hover:bg-cyan-400 dark:hover:bg-cyan-700 border rounded border-slate-700 px-3 py-2 disabled:border-slate-500 dark:disabled:border-slate-700 disabled:bg-inherit disabled:text-slate-500 dark:disabled:text-slate-600 dark:hover:disabled:bg-transparent transition duration-150 ease-in-out'ref={prevButton} id='prev' onClick={handleURLChange}>Previous</button>
                    <button className='w-50 text-slate-900 dark:text-slate-200 bg-transparent dark:bg-transparent hover:bg-cyan-400 dark:hover:bg-cyan-700 border rounded border-slate-700 px-3 py-2 disabled:border-slate-500 dark:disabled:border-slate-700 disabled:bg-inherit disabled:text-slate-500 dark:disabled:text-slate-600 dark:hover:disabled:bg-transparent transition duration-150 ease-in-out'ref={nextButton} id='next' onClick={handleURLChange}>Next</button>
                </div>
            </main>
        </URLContext.Provider>
	);
}