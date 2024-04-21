import Image from 'next/image';

export default function PokemonList({ pokemonList, showPokeInfo }) {
    
    return (
        <ul id='listComp' className={`w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 overflow-scroll ring-2 ring-indigo-300 dark:ring-indigo-950 my-4 py-2 rounded`}>
            {
                pokemonList.map((poke, index) =>
                (
                <li className='flex flex-col justify-between items-center' key={poke.order}>
                    <button className='h-full px-3 text-gray-700 dark:text-gray-400  hover:dark:text-gray-300 hover:text-gray-950 hover:font-semibold py-3  hover:ring-slate-500 hover:dark:ring-slate-950/60 rounded-lg hover:shadow-lg hover:shadow-slate-500/60 hover:dark:shadow-slate-900/80 hover:bg-sky-300/40 hover:dark:bg-indigo-900/20 focus:outline-0 focus:ring-2 focus:ring-slate-600 transition-all' onClick={showPokeInfo} data-order={index}>
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
    )
}