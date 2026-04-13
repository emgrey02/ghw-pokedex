'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonSearch() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        async function getPokemonFromSearch(name: string) {
            if (name === '') {
                return 'invalid search';
            }

            try {
                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`,
                );
                const pokemon = await res.json();
                return pokemon;
            } catch {
                (e.target as HTMLFormElement).reset();
                setLoading(false);
                setErrorMessage(`That's not a pokemon. Try searching again.`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);
            }
        }

        let pokemon = await getPokemonFromSearch(
            (e.currentTarget[0] as HTMLInputElement).value.toLowerCase(),
        );

        if (pokemon) {
            (e.target as HTMLFormElement).reset();
            setLoading(false);
            router.push(`/${pokemon.name}`);
        }
    }

    return (
        <>
            <form
                onSubmit={handleSearch}
                className='grid gap-2 w-80 my-10 relative'
            >
                <label
                    htmlFor='name'
                    className='mb-3'
                >
                    Search for a Pokemon
                </label>
                <span className='absolute top-6.25 text-xs h-5 text-red-600 font-bold'>
                    {errorMessage ? errorMessage : ''}
                </span>
                <input
                    className='bg-slate-100 border-2 border-slate-600 p-2 rounded focus:outline-none focus:ring-2 ring-slate-950  transition-all'
                    name='name'
                    id='name'
                    type='text'
                />

                <button
                    onClick={() => setLoading(true)}
                    className='cursor-pointer flex justify-center font-semibold w-full p-2 hover:bg-indigo-900/30  text-slate-600 hover:text-slate-900 rounded transition-all focus:outline-none focus:ring-2 ring-slate-950 border-2 border-slate-800 '
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
