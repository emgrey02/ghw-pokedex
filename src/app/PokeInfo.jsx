import Image from 'next/image';
import { useState} from 'react';

export default function PokeInfo({ currentPoke }) {
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);

    const playAudio = (e) => {
        setAudioIsPlaying(true);
        e.currentTarget.firstChild.play();
        e.currentTarget.firstChild.volume = .1;
        setTimeout(() => {
            setAudioIsPlaying(false);
        }, 1000)
    }
    
    return (
        <div className='place-self-center z-20 text-zinc-700 dark:text-gray-400 w-fit h-min flex flex-col gap-4 p-8 bg-zinc-400/50 dark:bg-zinc-600/50 outline outline-slate-600 shadow-xl shadow-slate-900/30 rounded-md'>
            <div className='grid grid-cols-2 h-min w-full gap-6 pb-10'>
                <div className='flex flex-col ring-1 ring-indigo-900 dark:ring-indigo-300 p-4 self-start'>
                    <button title='Hear My Cry!' className='hover:bg-gray-100/10 rounded-full transition-all' onClick={playAudio}>
                        <audio src={currentPoke.cries.latest}></audio>
                        <Image
                            className={audioIsPlaying ? 'animate-ping' : ''}
                            src={currentPoke.sprites.front_default}
                            width={150}
                            height={150}
                            alt={`picture of ${currentPoke.species.name.charAt(0).toUpperCase() + currentPoke.species.name.slice(1)}`}
                        />
                    </button>
                    <div className='flex flex-col items-center'>
                        <span className='text-sm'>Click me to hear my cry!</span>
                        <span className='text-sm'>(audio warning)</span>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <h2 className='text-zinc-900 dark:text-zinc-300 text-3xl font-bold'>{currentPoke.species.name.charAt(0).toUpperCase() + currentPoke.species.name.slice(1)}</h2>
                    <div className='flex flex-col gap-2'>
                        {currentPoke.types.map((type, index) =>
                        (
                        <div className='w-min flex flex-col items-center rounded-full border-2 border-indigo-900 dark:border-indigo-300 ' key={index}>
                                <p className='self-start px-2 py-px text-indigo-900 dark:text-indigo-300 font-semibold'>{type.type.name}</p>
                        </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-3xl text-indigo-900 dark:text-indigo-300 font-semibold'>{currentPoke.weight}</p>
                    <h3 className='text-sm'>Weight</h3>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-3xl text-indigo-900 dark:text-indigo-300 font-semibold'>{currentPoke.height}</p>
                    <h3 className='text-sm'>Height</h3>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-3xl text-indigo-900 dark:text-indigo-300 font-semibold'>{currentPoke.base_experience}</p>
                    <h3 className='text-sm'>Base XP</h3>
                </div>
            </div>
            <div className='col-span-3 h-px bg-slate-600 dark:bg-gray-500 rounded-lg'></div>
            <div className='grid grid-cols-3 grid-row-auto gap-8'>
                <h3 className='uppercase tracking-wider col-span-3 text-xl w-min place-self-center p-4'>Stats</h3>
                
                {currentPoke.stats.map((stat, index) =>
                (
                    <div className='flex flex-col items-center' key={index}>
                        <p className='text-3xl text-indigo-900 dark:text-indigo-300 font-semibold'>{stat.base_stat}</p>
                        <p className='text-sm'>{stat.stat.name}</p>
                    </div>
                ))
                }
                
            </div>
        </div>
    )
}