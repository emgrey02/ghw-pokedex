'use client'
import PokemonList from '@/app/PokemonList' 
import Button from '@/app/Button';
import { getPokemon, getAllPokemon } from '@/app/pokeService';
import { useState, useEffect, useRef, createContext, useCallback } from 'react';

export const URLContext = createContext();

export default function Page() {
    const [currentUrl, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=25&offset=0');
    const [isInfoShowing, setIsInfoShowing] = useState(false);
    const generalList = useRef();
    const prevButton = useRef();
    const nextButton = useRef();

    const handleDataFromChild = (data) => {
        setIsInfoShowing(data);
        prevButton.current.disabled = isDisabled('prev');
        nextButton.current.disabled = isDisabled('next');
    }
    
    const isDisabled = useCallback((currentButtonName) => {
        if (isInfoShowing) return true;
        if (currentButtonName === 'prev') {
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
    }, [isInfoShowing])

    useEffect(() => {
        
        async function getGeneralList() {
            let list = await getPokemon(currentUrl);
            generalList.current = list; 
            prevButton.current.disabled = isDisabled('prev');
            nextButton.current.disabled = isDisabled('next');
        } 
        getGeneralList();
        
    }, [currentUrl, prevButton, nextButton, isDisabled])
    
    function handleURLChange(e) {
        if (e.target.id === 'prev') {
            setUrl(generalList.current.previous);
        } else if (e.target.id === 'next') {
            setUrl(generalList.current.next);
        }
    }
    
    return (
        <URLContext.Provider value={{ currentUrl }}>
            <main id='main' className='grid grid-cols-1 w-full h-dvh min-h-0 text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16'> 
                <h1 className='text-3xl font-medium'>Pokedex</h1>
                <PokemonList onDataFromChild={handleDataFromChild} updateList={getAllPokemon} />
                <div id='buttonContainer' className=" w-full flex justify-between">
                    <Button ref={prevButton} id='prev' onClick={handleURLChange} text='Previous'/>
                    <Button ref={nextButton} id='next' onClick={handleURLChange} text='Next'/>
                </div>
            </main>
        </URLContext.Provider>
	);
}