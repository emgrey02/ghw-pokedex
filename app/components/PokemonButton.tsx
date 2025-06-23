import Image from 'next/image';
import Link from 'next/link';

export default function PokemonButton({ poke, index }) {
    return (
        <Link
            className='h-full grid place-items-center px-3 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-2 ring-indigo-800/80 ring-offset-2 ring-offset-purple-100 rounded-lg transition-all hover:bg-purple-300/40 hover:shadow-lg hover:shadow-slate-500/60'
            data-order={index}
            href={`/${poke.name}`}
        >
            {poke.sprites.front_default || poke.sprites.front_shiny ? (
                <Image
                    src={poke.sprites.front_default || poke.sprites.front_shiny}
                    width={100}
                    height={100}
                    alt={`picture of ${poke.name}`}
                />
            ) : (
                <div className='w-20 h-20 bg-purple-600/60'></div>
            )}
            <h2 className='text-inherit'>
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </h2>
        </Link>
    );
}
