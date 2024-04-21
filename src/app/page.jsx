'use client'
import PokemonListContainer from '@/app/PokemonListContainer' 
import Button from '@/app/Button';
import { getPokemon } from '@/app/pokeService';
import { useState, useEffect, useRef, useCallback } from 'react';

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
        window.scrollTo(0,0)
        if (e.target.id === 'prev') {
            setUrl(generalList.current.previous);
        } else if (e.target.id === 'next') {
            setUrl(generalList.current.next);
        }
    }

    
    return (
        <>
            <main id='main' className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 ${isInfoShowing ? 'yes-info' : 'no-info'}`}> 
                        <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                <PokemonListContainer currentUrl={currentUrl} key={currentUrl} onDataFromChild={handleDataFromChild} />
                        <div id='buttonContainer' className={`w-full flex justify-between place-self-center`}>
                            <Button ref={prevButton} id='prev' onClick={handleURLChange} text='Previous'/>
                            <Button ref={nextButton} id='next' onClick={handleURLChange} text='Next'/>
                        </div>
                    
            </main>
        </>
	);
}