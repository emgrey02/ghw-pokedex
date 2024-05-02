import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getPokemonFromSearch } from './pokeService';

export default function PokemonSearch({ onDataFromChild }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const sendDataToParent = (data) => {
        onDataFromChild(data);
        setLoading(false);
    };

    async function doTheThing(e) {
        e.preventDefault();
        let pokemon = await getPokemonFromSearch(
            e.currentTarget[0].value.toLowerCase(),
        );
        if (typeof pokemon === 'string') {
            setLoading(false);
            setErrorMessage(pokemon);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000);
            return;
        }
        sendDataToParent(pokemon);
    }

    return (
        <>
            <form
                onSubmit={doTheThing}
                className='grid w-80 my-10'
            >
                <label htmlFor='name'>Search for a Pokemon</label>
                <input
                    className='bg-slate-600 text-slate-200 dark:bg-slate-400 dark:text-slate-900 p-2 my-2 rounded focus:outline-none focus:ring-4 ring-indigo-950 dark:ring-indigo-200 transition-all'
                    name='name'
                    id='name'
                    type='text'
                />
                <span className='text-xs h-5 text-red-600 dark:text-red-300 font-bold'>
                    {errorMessage ? errorMessage : ''}
                </span>
                <button
                    onClick={() => setLoading(true)}
                    className='flex justify-center dark:text-slate-800 font-semibold dark:hover:text-slate-200 w-full p-2 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 dark:ring-indigo-200 border border-slate-800 dark:border-slate-600'
                    type='submit'
                >
                    {isLoading ?
                        <span className='block animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-300 dark:border-zinc-300 '></span>
                    :   'Search'}
                </button>
            </form>
        </>
    );
}
