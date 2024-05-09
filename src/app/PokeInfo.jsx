'use client';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';

export default function PokeInfo({ poke, hideInfo }) {
    console.log(poke);

    return (
        <>
            <div
                id='theInfo'
                className='place-self-center flex flex-col gap-y-4'
            >
                <button
                    className='z-20 dark:text-slate-800 font-semibold dark:hover:text-slate-200 bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 dark:bg-indigo-400 dark:hover:bg-indigo-400/50 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 dark:border-slate-600 px-7 py-3'
                    onClick={hideInfo}
                >
                    Back
                </button>

                <div
                    id='card'
                    className={`place-self-center z-20 text-zinc-700 dark:text-gray-400 w-fit h-min flex flex-col gap-4 p-8 bg-zinc-400/50 dark:bg-zinc-600/50 outline outline-slate-600 shadow-xl shadow-slate-900/30 rounded-md`}
                >
                    <div className='grid grid-cols-2 h-min w-full gap-6 pb-10'>
                        <div className='relative flex flex-col ring-1 ring-indigo-900 dark:ring-indigo-300 p-4 self-start'>
                            {(
                                poke.sprites.front_default ||
                                poke.sprites.front_shiny
                            ) ?
                                <>
                                    <Image
                                        className='relative'
                                        src={
                                            poke.sprites.front_default ||
                                            poke.sprites.front_shiny
                                        }
                                        width={150}
                                        height={150}
                                        alt={`picture of ${poke.species.name.charAt(0).toUpperCase() + poke.species.name.slice(1)}`}
                                    />
                                    <AudioPlayer
                                        className='absolute'
                                        audio={poke.cries.latest}
                                    />
                                </>
                            :   <div
                                    className='w-24 h-24 bg-gray-500/60'
                                    title='no pokemon image found'
                                ></div>
                            }
                            <div className='flex flex-col items-center'>
                                <span className='text-xs md:text-sm text-center transition-all'>
                                    Click me to hear my cry!
                                </span>
                                <span className='text-xs md:text-sm'>
                                    (audio warning)
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <h2 className='text-zinc-900 dark:text-zinc-300 text-2xl md:text-3xl font-bold transition-all'>
                                {poke.species.name.charAt(0).toUpperCase() +
                                    poke.species.name.slice(1)}
                            </h2>
                            <div className='flex flex-col gap-2'>
                                <h3>Type</h3>
                                {poke.types.map((type, index) => (
                                    <div
                                        className='w-min flex flex-col items-center rounded-full border-2 border-indigo-900 dark:border-indigo-300'
                                        key={index}
                                    >
                                        <p className='self-start px-2 py-px text-indigo-900 dark:text-indigo-300 text-sm md:text-base transition-all font-semibold'>
                                            {type.type.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 items-center'>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                                {poke.weight / 10 || 'N/A'} kg
                            </p>
                            <h3 className='text-xs md:text-sm transition-all'>
                                Weight
                            </h3>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                                {poke.height / 10 || 'N/A'} m
                            </p>
                            <h3 className='text-xs md:text-sm transition-all'>
                                Height
                            </h3>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                                {poke.base_experience || 'N/A'}
                            </p>
                            <h3 className='text-xs md:text-sm transition-all'>
                                Base XP
                            </h3>
                        </div>
                    </div>
                    <div className='col-span-3 h-px bg-slate-600 dark:bg-gray-500 rounded-lg'></div>
                    <div className='grid grid-cols-3 grid-row-auto gap-8'>
                        <h3 className='uppercase tracking-wider col-span-3 text-xl w-min place-self-center p-4'>
                            Stats
                        </h3>

                        {poke.stats.map((stat, index) => (
                            <div
                                className='flex flex-col items-center'
                                key={index}
                            >
                                <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                                    {stat.base_stat || 'N/A'}
                                </p>
                                <h3 className='text-xs md:text-sm text-center transition-all'>
                                    {stat.stat.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
