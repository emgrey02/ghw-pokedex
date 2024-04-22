'use client'
import { getPokemon } from '@/app/pokeService';
import Button from '@/app/Button';
import { useEffect, useState, useRef } from 'react';
import PokemonSearch from '@/app/PokemonSearch';
import PokemonList from '@/app/PokemonList';
import PokeInfo from '@/app/PokeInfo';

export default function PokemonListContainer({ onDataFromChild }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [currentUrl, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=25&offset=0');
    const [isPrevDisabled, setPrevDisabled] = useState(false);
    const [isNextDisabled, setNextDisabled] = useState(false);

    const [isInfoMounted, setIsInfoMounted] = useState(false);
    const hasInfoTransitionedIn = useMountTransition(isInfoMounted, 500);

    const clickedPoke = useRef();
    const generalList = useRef();
    
    function handleURLChange(e) {
        window.scrollTo(0,0)
        if (e.target.id === 'prev') {
            setUrl(generalList.current.previous);
        } else if (e.target.id === 'next') {
            setUrl(generalList.current.next);
        }
    }

    const sendDataToParent = (data) => {
        onDataFromChild(data);
    }

    const showPokeInfoFromSearch = (data) => {
        clickedPoke.current = data;
        setShowInfo(true);
        setIsInfoMounted(true);
        sendDataToParent(true);
    }
    
    const showPokeInfo = (e) => {
        let clickedPokeIndex = e.currentTarget.getAttribute('data-order');
        clickedPoke.current = pokemonList[clickedPokeIndex];
        console.log(clickedPoke);
        setShowInfo(true);
        setIsInfoMounted(true);
        sendDataToParent(true);
    };

    const hidePokeInfo = () => {
        setShowInfo(false);
        setIsInfoMounted(false);
        sendDataToParent(false);
    }

    function useMountTransition(isInfoMounted, unmountDelay) {
        const [hasInfoTransitionedIn, setHasInfoTransitionedIn] = useState(false);

        useEffect(() => {
            let timeoutId;

            if (isInfoMounted && !hasInfoTransitionedIn) {
                setHasInfoTransitionedIn(true);
            } else if (!isInfoMounted && setHasInfoTransitionedIn) {
                timeoutId = setTimeout(() => setHasInfoTransitionedIn(false), unmountDelay)
            }

            return () => {
                clearTimeout(timeoutId);
            }
        }, [unmountDelay, isInfoMounted, hasInfoTransitionedIn])
        return hasInfoTransitionedIn;
    }

    useEffect(() => {
        setLoading(true);

        function setDisability(list) {
            if (list.previous == null) {
                setPrevDisabled(true);
            } else {
                setPrevDisabled(false);
            }
    
            if (list.next == null) {
                setNextDisabled(true);
            } else {
                setNextDisabled(false);
            }
        }

        async function getGeneralList() {
            let list = await getPokemon(currentUrl);
            generalList.current = list; 
            setDisability(list);
        } 
        
        getGeneralList();


        getPokemon(currentUrl).then(async (data) => {
            let pokemonArray = [];
            for (let i = 0; i < data.results.length; i++) {
                let url = data.results[i].url;
                const res = await fetch(url, {method: 'get'});
                if (!res.ok) {
                    throw new Error('failed to fetch individual pokemon data');
                }
                pokemonArray.push(await res.json());
            }
            return pokemonArray;
        }).then((array) => {
            setPokemonList(array);
            setLoading(false);
        }).catch(error => console.error(error));
        
    }, [currentUrl])

    if (showInfo && (hasInfoTransitionedIn || isInfoMounted)) return (
            <div id='theInfo' className={`place-self-center flex flex-col gap-y-4 $`}>
                <button className='z-20 dark:text-slate-800 font-semibold dark:hover:text-slate-200 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600 px-7 py-3' onClick={hidePokeInfo}>Back</button>
                <PokeInfo tr={hasInfoTransitionedIn} mo={isInfoMounted} currentPoke={clickedPoke.current} />
            </div>
    )

    return (
        <>
            <PokemonSearch onDataFromChild={showPokeInfoFromSearch} />
            <div className={`w-full flex justify-between place-self-center`}>
                <Button id='prev' onClick={handleURLChange} disabled={isPrevDisabled} text='Previous'/>
                <Button id='next' onClick={handleURLChange} disabled={isNextDisabled} text='Next'/>
            </div>
            {isLoading ? (
                <div id='loadingComp' className='w-full h-full grid gap-2 place-items-center'>
                    <div className='flex gap-2 place-items-center'>
                        <span className='animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-600 dark:border-zinc-300 '></span>
                        <p>Loading...</p>
                    </div>
                </div>
            ) : (
                <PokemonList pokemonList={pokemonList} showPokeInfo={showPokeInfo} />
            )}
            <div className={`w-full flex justify-between place-self-center`}>
                <Button id='prev' onClick={handleURLChange} disabled={isPrevDisabled} text='Previous'/>
                <Button id='next' onClick={handleURLChange} disabled={isNextDisabled} text='Next'/>
            </div>

        </>
    )
}