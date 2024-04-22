import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PokeInfo({ currentPoke, tr, mo }) {
    const [audio] = useState(new Audio(currentPoke.cries.latest));
    const [playing, setPlaying] = useState(false);

    const playAudio = (e) => {
        setPlaying(true);
    }

    useEffect(() => {
        audio.volume = .2;
        playing ? audio.play() : audio.pause();
        
    }, [playing, audio])
    
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
    
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        }
    },)
    
    return (
        <div id='card' className={`place-self-center z-20 text-zinc-700 dark:text-gray-400 w-fit h-min flex flex-col gap-4 p-8 bg-zinc-400/50 dark:bg-zinc-600/50 outline outline-slate-600 shadow-xl shadow-slate-900/30 rounded-md ${tr && 'in'} ${mo && 'visible'}`}>
            <div className='grid grid-cols-2 h-min w-full gap-6 pb-10'>
                <div className='flex flex-col ring-1 ring-indigo-900 dark:ring-indigo-300 p-4 self-start'>
                    <button title='Hear My Cry!' className='hover:bg-gray-100/10 rounded-full transition-all' onClick={playAudio}>
                        <audio src={currentPoke.cries.latest}></audio>
                        <Image
                            className={playing ? 'animate-ping' : ''}
                            src={currentPoke.sprites.front_default}
                            width={150}
                            height={150}
                            alt={`picture of ${currentPoke.species.name.charAt(0).toUpperCase() + currentPoke.species.name.slice(1)}`}
                        />
                    </button>
                    <div className='flex flex-col items-center'>
                        <span className='text-xs md:text-sm text-center transition-all'>Click me to hear my cry!</span>
                        <span className='text-xs md:text-sm'>(audio warning)</span>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <h2 className='text-zinc-900 dark:text-zinc-300 text-2xl md:text-3xl font-bold transition-all'>{currentPoke.species.name.charAt(0).toUpperCase() + currentPoke.species.name.slice(1)}</h2>
                    <div className='flex flex-col gap-2'>
                        {currentPoke.types.map((type, index) =>
                        (
                        <div className='w-min flex flex-col items-center rounded-full border-2 border-indigo-900 dark:border-indigo-300' key={index}>
                                <p className='self-start px-2 py-px text-indigo-900 dark:text-indigo-300 text-sm md:text-base transition-all font-semibold'>{type.type.name}</p>
                        </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>{currentPoke.weight}</p>
                    <h3 className='text-xs md:text-sm transition-all'>Weight</h3>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>{currentPoke.height}</p>
                    <h3 className='text-xs md:text-sm transition-all'>Height</h3>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>{currentPoke.base_experience}</p>
                    <h3 className='text-xs md:text-sm transition-all'>Base XP</h3>
                </div>
            </div>
            <div className='col-span-3 h-px bg-slate-600 dark:bg-gray-500 rounded-lg'></div>
            <div className='grid grid-cols-3 grid-row-auto gap-8'>
                <h3 className='uppercase tracking-wider col-span-3 text-xl w-min place-self-center p-4'>Stats</h3>
                
                {currentPoke.stats.map((stat, index) =>
                (
                    <div className='flex flex-col items-center' key={index}>
                        <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>{stat.base_stat}</p>
                        <p className='text-xs md:text-sm text-center transition-all'>{stat.stat.name}</p>
                    </div>
                ))
                }
                
            </div>
        </div>
    )
}