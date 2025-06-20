'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonSearch() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    async function doTheThing(e) {
        e.preventDefault();
        async function getPokemonFromSearch(name) {
            if (name === '') {
                return 'invalid search';
            }

            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );

            if (!res.ok) {
                return `That's not a pokemon. Try searching again.`;
            }
            const pokemon = await res.json();
            return pokemon;
        }

        let pokemon = await getPokemonFromSearch(
            e.currentTarget[0].value.toLowerCase()
        );

        if (typeof pokemon === 'string') {
            setLoading(false);
            setErrorMessage(pokemon);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000);
            return;
        } else {
            e.target.childNodes[1].value = '';
            setLoading(false);
            router.push(`/${pokemon.name}`);
        }
    }

    return (
        <>
            <form
                onSubmit={doTheThing}
                className='grid gap-2 w-80 my-10 relative'
            >
                <label
                    htmlFor='name'
                    className='mb-3'
                >
                    Search for a Pokemon
                </label>
                <span className='absolute top-[25px] text-xs h-5 text-red-600 font-bold'>
                    {errorMessage ? errorMessage : ''}
                </span>
                <input
                    className='bg-slate-100 border-[2px] border-slate-600 p-2 rounded focus:outline-none focus:ring-2 ring-slate-950  transition-all'
                    name='name'
                    id='name'
                    type='text'
                />

                <button
                    onClick={() => setLoading(true)}
                    className='cursor-pointer flex justify-center font-semibold w-full p-2 hover:bg-indigo-900/30  text-slate-600 hover:text-slate-900 rounded transition-all focus:outline-none focus:ring-2 ring-slate-950 border-[2px] border-slate-800 '
                    type='submit'
                >
                    {isLoading ? (
                        <span className='block animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-300 dark:border-zinc-300 '></span>
                    ) : (
                        'Search'
                    )}
                </button>
            </form>
        </>
    );
}
