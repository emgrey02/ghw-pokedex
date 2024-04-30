'use client'
import { getCurrentPokemon, getPokemonFromSearch } from '@/app/pokeService';
import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { NowPlayingContextProvider } from 'react-nowplaying';
import Loading from '@/app/loading';
import PokemonSearch from '@/app/PokemonSearch';
import PokemonList from '@/app/PokemonList';
import PokeInfo from '@/app/PokeInfo';
import PaginationBar from '@/app/PaginationBar';

export default function PokemonListContainer({page, setInfo}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const clickedPoke = useRef();

    const params = new URLSearchParams(searchParams);

    let currentPage = searchParams.get('page') || page;

    const setTheInfo = (isInfoShowing) => {
        setInfo(isInfoShowing);
        setShowInfo(isInfoShowing);
    }

    const setQuery = (name) => {
        params.set('query', name);
        router.push(pathname + '?' + params.toString());
        
        setTheInfo(true);
    }

    const showPokeInfoFromSearch = (data) => {
        clickedPoke.current = data;
        setQuery(data.name)
    }
    
    const showPokeInfo = (e) => {
        let clickedPokeIndex = e.currentTarget.getAttribute('data-order');
        clickedPoke.current = pokemonList[clickedPokeIndex];
        setQuery(clickedPoke.current.name)
    };

    const hidePokeInfo = () => {
        console.log('hiding poke info')
        params.delete('query');
        router.push(pathname + '?' + params.toString());
        
        setTheInfo(false);
    }

    async function setCurrentPoke() {
        let pokeName = params.get('query');
        let thePokemon = await getPokemonFromSearch(pokeName);
        if (typeof thePokemon === 'object') {
            clickedPoke.current = thePokemon;
        } else return thePokemon;
    }

    useEffect(() => {
        if (params.has('query')) {
            if (clickedPoke.current == undefined) {
                console.log('clickedpoke is undefined or null');
                setCurrentPoke().then((poke) => {
                    if (typeof poke === 'string') {
                        router.push(pathname);
                        setTheInfo(false);
                    } else {
                        setTheInfo(true);
                    }
                });
            } else {
                setTheInfo(true);
            }
        } else {
            setTheInfo(false);
        }
    }, [params])

    useEffect( () => {
        setLoading(true);

        getCurrentPokemon(currentPage).then(async (data) => {
            setPokemonList(data);
            setLoading(false);
        }).catch(error => console.error(error));

    }, [currentPage])

    if (showInfo) return (
        <div id='theInfo' className={`place-self-center flex flex-col gap-y-4 $`}>
            <button className='z-20 dark:text-slate-800 font-semibold dark:hover:text-slate-200 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600 px-7 py-3' onClick={hidePokeInfo}>Back</button>
            <NowPlayingContextProvider>
                <PokeInfo currentPoke={clickedPoke.current} />
            </NowPlayingContextProvider>
        </div>
    )

    return (
        <Suspense fallback={Loading}>
            <PokemonSearch onDataFromChild={showPokeInfoFromSearch} />

            <div className={`w-full flex justify-between items-center place-self-center md:hidden`}>
                <PaginationBar page={currentPage} key={currentPage} />
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <PokemonList pokemonList={pokemonList} showPokeInfo={showPokeInfo} />
            )}

            <div className={`w-full flex justify-between items-center place-self-center`}>
                <PaginationBar page={currentPage} key={currentPage} />
            </div>
        </Suspense>
    )
}