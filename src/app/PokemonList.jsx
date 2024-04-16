'use client'
import Image from 'next/image';
import { URLContext } from './page';
import { useEffect, useState, useContext, useRef } from 'react';
import PokeInfo from '@/app/PokeInfo';

export default function PokemonList({ updateList }) {
    const [pokemonList, setPokemonList] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    let clickedPoke = useRef();
    let { currentUrl } = useContext(URLContext);
    
    const showPokeInfo = (e) => {
        let clickedPokeIndex = e.currentTarget.getAttribute('data-order');
        clickedPoke.current = pokemonList[clickedPokeIndex];
        console.log(clickedPoke);
        setShowInfo(true);
    }

    const hidePokeInfo = () => {
        setShowInfo(false);
    }

    useEffect(() => {
        setLoading(true);
        updateList(currentUrl).then((data) => {
            setPokemonList(data);
            setLoading(false);
        }).catch(error => console.error(error));
    },[currentUrl, updateList])
   
    if (isLoading) return <p>Loading...</p>
    if (showInfo) return (
        <section>
            <PokeInfo currentPoke={clickedPoke.current} />
            <button onClick={hidePokeInfo}>back</button>
        </section>
    )

    return (
        <ul className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-y-10 gap-x-2 sm:gap-x-5 my-10'>
            {
                pokemonList.map((poke, index) =>
                (
                    <li className='flex flex-col justify-between items-center' key={poke.order}>
                        <button className='text-slate-800 dark:text-gray-300 px-3 py-3 hover:outline outline-sky-700 dark:outline-slate-700 rounded-sm hover:shadow-lg hover:shadow-sky-700/80 hover:dark:shadow-slate-700/80 hover:bg-sky-400/40 hover:dark:bg-gray-800/40 transition-all'onClick={showPokeInfo} data-order={index}>
                            <Image
                                src={poke.sprites.front_default}
                                width={100}
                                height={100}
                                alt={`picture of ${poke.name}`}
                            />
                            <h2>{poke.name}</h2>
                        </button>
                    </li>
                )
                )
            }
        </ul>
    )
}