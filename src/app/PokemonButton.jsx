'use client';
import Image from 'next/image';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PokemonButton({ poke, index, sendCurrentPoke }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const setQuery = (name) => {
        console.log('setting query');
        params.set('query', name);
        router.push(pathname + '?' + params.toString());
    };

    const activatePokeInfo = () => {
        setQuery(poke.name);
        console.log('sending poke from pokemon button');
        sendCurrentPoke(poke);
    };

    return (
        <button
            className='h-full grid place-items-center grid-rows-2 px-3 text-gray-700 dark:text-gray-400  hover:dark:text-gray-300 hover:text-gray-950 hover:font-semibold py-3 hover:ring-slate-500 hover:dark:ring-slate-950/60 rounded-lg hover:shadow-lg hover:shadow-slate-500/60 hover:dark:shadow-slate-900/80 hover:bg-sky-300/40 hover:dark:bg-indigo-900/20 focus:outline-0 focus:ring-2 ring-slate-600 dark:ring-slate-300 transition-all'
            onClick={() => activatePokeInfo()}
            data-order={index}
        >
            {poke.sprites.front_default || poke.sprites.front_shiny ?
                <Image
                    src={poke.sprites.front_default || poke.sprites.front_shiny}
                    width={100}
                    height={100}
                    alt={`picture of ${poke.name}`}
                />
            :   <div className='w-20 h-20 bg-gray-600/60'></div>}
            <h2 className='text-inherit'>
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </h2>
        </button>
    );
}
