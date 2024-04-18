'use client'
import Image from 'next/image';
import { URLContext } from './page';
import { useEffect, useState, useContext, useRef } from 'react';
import PokemonSearch from '@/app/PokemonSearch';
import PokeInfo from '@/app/PokeInfo';

export default function PokemonList({ updateList, onDataFromChild }) {
    const [pokemonList, setPokemonList] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    let clickedPoke = useRef();

    let { currentUrl } = useContext(URLContext);

    const sendDataToParent = (data) => {
        onDataFromChild(data);
    }

    const showPokeInfoFromSearch = (data) => {
        clickedPoke.current = data;
        setShowInfo(true);
        sendDataToParent(true);
    }
    
    const showPokeInfo = (e) => {
        let clickedPokeIndex = e.currentTarget.getAttribute('data-order');
        clickedPoke.current = pokemonList[clickedPokeIndex];
        console.log(clickedPoke);
        setShowInfo(true);
        sendDataToParent(true);
    };

    const hidePokeInfo = () => {
        setShowInfo(false);
        sendDataToParent(false);
    }

    useEffect(() => {
        setLoading(true);
        updateList(currentUrl).then((data) => {
            setPokemonList(data);
            setLoading(false);
        }).catch(error => console.error(error));
    },[currentUrl, updateList])

    if (showInfo) return (
        <>
            <button className='z-20 place-self-start self-end dark:text-slate-800 font-semibold dark:hover:text-slate-200 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600 px-7 py-3' onClick={hidePokeInfo}>Back</button>
            <PokeInfo currentPoke={clickedPoke.current} />
        </>
    )

    return (
        <>
            <PokemonSearch onDataFromChild={showPokeInfoFromSearch} />
            {isLoading ? (
                <div id='loadingComp' className='w-full h-full grid gap-2 place-items-center'>
                    <div className='flex gap-2 place-items-center'>
                        <span className='animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-600 dark:border-zinc-300 '></span>
                        <p>Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    <ul id='listComp' className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 overflow-scroll ring-2 ring-indigo-300 dark:ring-indigo-950 my-4 py-2 rounded'>
                        {
                            pokemonList.map((poke, index) =>
                            (
                                <li className='flex flex-col justify-between items-center' key={poke.order}>
                                    <button className='h-full px-3 text-gray-700 dark:text-gray-400  hover:dark:text-gray-300 font-semibold py-3 hover:ring-2 hover:ring-slate-500 hover:dark:ring-slate-950/60 rounded-sm hover:shadow-lg hover:shadow-slate-500/60 hover:dark:shadow-slate-900/80 hover:bg-sky-300/40 hover:dark:bg-indigo-950/40 focus:outline-0 focus:ring-2 focus:ring-slate-600 transition-all'onClick={showPokeInfo} data-order={index}>
                                        <Image
                                            src={poke.sprites.front_default}        
                                            width={100}
                                            height={100}
                                            alt={`picture of ${poke.name}`}
                                        />
                                        <h2 className='text-inherit'>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
                                    </button>
                                </li>
                            )
                            )
                        }
                    </ul>
                </>
            )}

        </>
    )
}