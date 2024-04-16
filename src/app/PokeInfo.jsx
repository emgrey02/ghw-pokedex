import Image from 'next/image';

export default function PokeInfo({ currentPoke }) {
    
    return (
        <div>
            <Image
                src={currentPoke.sprites.front_default}
                width={100}
                height={100}
                alt={`picture of ${currentPoke.species.name}`}
            />
            <h2>{currentPoke.species.name}</h2>
            <div>
                <h3>Stats</h3>
                <ul>
                    {currentPoke.stats.map((stat, index) =>
                    (
                        <li key={index}>
                            <p>{stat.stat.name}</p>
                            <p>{stat.base_stat}</p>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}