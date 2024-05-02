import Image from 'next/image';
import { useState, useEffect } from 'react';
import { mixAudio } from 'ffmpeg-audio-mixer';
import { useNowPlaying } from 'react-nowplaying';

export default function PokeInfo({ currentPoke }) {
    const [cry, setCry] = useState(null);
    const [playing, setPlaying] = useState(false);
    const { play, uid, stop, player } = useNowPlaying();

    useEffect(() => {
        let audioElement = document.querySelector('audio');
        audioElement.addEventListener('ended', () => setPlaying(false));

        async function convertCryFile() {
            setCry(mixAudio(currentPoke.cries.latest).toFile('cry.mp3'));
        }

        convertCryFile();

        return () => {
            audioElement.removeEventListener('ended', () => setPlaying(false));
        };
    });

    function playAudio() {
        player.load();
        play(cry, 'audio/mp3', 'url');
        console.log(player.currentSrc);
        console.log(player.canPlayType('audio/mp3'));
    }

    return (
        <>
            <div
                id='card'
                className={`place-self-center z-20 text-zinc-700 dark:text-gray-400 w-fit h-min flex flex-col gap-4 p-8 bg-zinc-400/50 dark:bg-zinc-600/50 outline outline-slate-600 shadow-xl shadow-slate-900/30 rounded-md`}
            >
                <div className='grid grid-cols-2 h-min w-full gap-6 pb-10'>
                    <div className='flex flex-col ring-1 ring-indigo-900 dark:ring-indigo-300 p-4 self-start'>
                        <button
                            title='Hear My Cry!'
                            className=' hover:bg-gray-500/30 rounded-full flex flex-col items-center justify-center transition-all'
                            onClick={() =>
                                uid === 'url' ? stop() : playAudio()
                            }
                        >
                            {(
                                currentPoke.sprites.front_default ||
                                currentPoke.sprites.front_shiny
                            ) ?
                                <Image
                                    className={playing ? 'animate-ping' : ''}
                                    src={
                                        currentPoke.sprites.front_default ||
                                        currentPoke.sprites.front_shiny
                                    }
                                    width={150}
                                    height={150}
                                    alt={`picture of ${currentPoke.species.name.charAt(0).toUpperCase() + currentPoke.species.name.slice(1)}`}
                                />
                            :   <div
                                    className='w-24 h-24 bg-gray-500/60'
                                    title='no pokemon image found'
                                ></div>
                            }
                        </button>
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
                            {currentPoke.species.name.charAt(0).toUpperCase() +
                                currentPoke.species.name.slice(1)}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            <h3>Type</h3>
                            {currentPoke.types.map((type, index) => (
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
                            {currentPoke.weight / 10 || 'N/A'} kg
                        </p>
                        <h3 className='text-xs md:text-sm transition-all'>
                            Weight
                        </h3>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                            {currentPoke.height / 10 || 'N/A'} m
                        </p>
                        <h3 className='text-xs md:text-sm transition-all'>
                            Height
                        </h3>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl md:text-3xl text-indigo-900 dark:text-indigo-300 font-semibold transition-all'>
                            {currentPoke.base_experience || 'N/A'}
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

                    {currentPoke.stats.map((stat, index) => (
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
        </>
    );
}
