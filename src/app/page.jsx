'use client'
import PokemonList from '@/app/PokemonList' 
import Button from '@/app/Button';
import { getPokemon, getAllPokemon } from '@/app/pokeService';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Page() {
    const [currentUrl, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=25&offset=0');
    const [isInfoShowing, setIsInfoShowing] = useState(false);
    const generalList = useRef();
    const prevButton = useRef();
    const nextButton = useRef();

    const [isMounted, setIsMounted] = useState(true);
    const hasTransitionedIn = useMountTransition(isMounted, 500);

    const handleDataFromChild = (data) => {
        setIsInfoShowing(data);
        if (data) {
            setIsMounted(false);
        } else {
            setIsMounted(true);
        }
        prevButton.current.disabled = isDisabled('prev');
        nextButton.current.disabled = isDisabled('next');
    }

    function useMountTransition(isMounted, unmountDelay) {
        const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

        useEffect(() => {
            let timeoutId;

            if (isMounted && !hasTransitionedIn) {
                setHasTransitionedIn(true);
            } else if (!isMounted && setHasTransitionedIn) {
                timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay)
            }

            return () => {
                clearTimeout(timeoutId);
            }
        }, [unmountDelay, isMounted, hasTransitionedIn])
        return hasTransitionedIn;
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
        console.log('running useEffect')
        let cont = document.querySelector('#main');
        

        if (isInfoShowing) {
            setTimeout(() => { 
                console.log('transitioning to showingInfo')
                if (cont.classList.contains('no-info')) {
                    cont.classList.remove('no-info');
                }
                cont.classList.add('yes-info');
            }, 500)
        } else {
            setTimeout(() => {
                console.log('transitioning from showingInfo')
                if (cont.classList.contains('yes-info')) {
                    cont.classList.remove('yes-info');
                }
                cont.classList.add('no-info');
            }, 500)
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
        <>
            <main id='main' className={`grid grid-cols-1 w-full md:h-dvh md:min-h-dvh text-slate-800 dark:text-slate-200 bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 px-4 py-8 md:px-16 ${isInfoShowing ? 'yes-info' : 'no-info'}`}> 
                        <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                <PokemonList currentUrl={currentUrl} onDataFromChild={handleDataFromChild} updateList={getAllPokemon} />
                        <div id='buttonContainer' className={`w-full flex justify-between place-self-center`}>
                            <Button ref={prevButton} id='prev' onClick={handleURLChange} text='Previous'/>
                            <Button ref={nextButton} id='next' onClick={handleURLChange} text='Next'/>
                        </div>
                    
            </main>
        </>
	);
}