'use client'
import { getCurrentPokemon } from '@/app/pokeService';
import Button from '@/app/Button';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PokemonSearch from '@/app/PokemonSearch';
import PokemonList from '@/app/PokemonList';
import PokeInfo from '@/app/PokeInfo';
import PaginationBar from '@/app/PaginationBar';

export default function PokemonListContainer({ onDataFromChild, page }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);

        return params.toString()
    }, [searchParams])

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    const [isInfoMounted, setIsInfoMounted] = useState(false);
    const hasInfoTransitionedIn = useMountTransition(isInfoMounted, 500);

    const clickedPoke = useRef();
    
    function handleURLChange(e) {
        window.scrollTo(0,0)
        if (e.target.id === 'prev') {
            router.push(pathname + '?' + createQueryString('page', Number(page) - 1))
        } else if (e.target.id === 'next') {
            router.push(pathname + '?' + createQueryString('page', Number(page) + 1))
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

    useEffect( () => {
        setLoading(true);

        getCurrentPokemon(page).then(async (data) => {
            console.log(data);
            setPokemonList(data);
            setLoading(false);
        }).catch(error => console.error(error));
        
    }, [page])

    if (showInfo && (hasInfoTransitionedIn || isInfoMounted)) return (
            <div id='theInfo' className={`place-self-center flex flex-col gap-y-4 $`}>
                <button className='z-20 dark:text-slate-800 font-semibold dark:hover:text-slate-200 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600 px-7 py-3' onClick={hidePokeInfo}>Back</button>
                <PokeInfo tr={hasInfoTransitionedIn} mo={isInfoMounted} currentPoke={clickedPoke.current} />
            </div>
    )

    return (
        <>
            <PokemonSearch onDataFromChild={showPokeInfoFromSearch} />
            <div className={`w-full flex justify-between items-center place-self-center md:hidden`}>
                <PaginationBar page={page} key={page} />
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
            <div className={`w-full flex justify-between items-center place-self-center`}>
                <PaginationBar page={page} key={page} />
            </div>
        </>
    )
}