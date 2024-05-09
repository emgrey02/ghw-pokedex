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
            className='h-full grid place-items-center px-3 text-gray-700 dark:text-gray-400'
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
