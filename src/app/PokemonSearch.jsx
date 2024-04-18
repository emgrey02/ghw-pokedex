import { useState } from 'react'; 
    
export default function PokemonSearch({ onDataFromChild }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const sendDataToParent = (data) => {
        onDataFromChild(data);
        setLoading(false);
    }

    async function getPokemonFromSearch(formData) {
        const rawFormData = {
            name: formData.get('name')
        }
        
        if (rawFormData.name === '') {
            setErrorMessage('Invalid Search.');
            setLoading(false);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000)
            return;
        }

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rawFormData.name}`);

        if (!res.ok) {
            setErrorMessage(`That's not a pokemon. Try searching again.`);
            setLoading(false);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000)
            return;
        }
        const pokemon = await res.json();
        sendDataToParent(pokemon);
    }

    return (
        <>
            <form action={getPokemonFromSearch} className='grid w-80 my-10'>
                <label>Search for a Pokemon</label> 
                <input className='bg-slate-600 text-slate-200 dark:bg-slate-400 dark:text-slate-900 p-2 my-2 rounded focus:outline-none focus:ring-4 ring-indigo-950 dark:ring-indigo-400 transition-all' name='name' id='name' type='text' />
                <span className='text-xs h-5 text-red-600 dark:text-red-300 font-bold'>{errorMessage ? errorMessage : ''}</span>
                <button onClick={()=> setLoading(true)} className='flex justify-center dark:text-slate-800 font-semibold dark:hover:text-slate-200 w-full p-2 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600' type='submit'>{isLoading ? (
                    <span className='block animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-300 dark:border-zinc-300 '></span>
                ): 'Search'}</button>
            </form>
        </>
    )
}