import PaginationBar from './PaginationBar';
import PokemonButton from './PokemonButton';

export default async function SearchResults(props: {
    query: string;
    currentPage: number;
}) {
    let pokemonList = [];
    let totalPages = 0;

    const options: RequestInit = {
        method: 'GET',
        cache: 'force-cache',
    };

    async function getAllPokemon() {
        let pokemonUrls = [];
        let offset = 20;
        let stillPokemon = true;

        while (stillPokemon) {
            const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;

            const pokeUrls = await fetch(url, options).then((res) =>
                res.json(),
            );

            if (!pokeUrls.next) {
                stillPokemon = false;
            }

            if (pokemonUrls.length == 0) {
                pokemonUrls = pokeUrls.results;
            } else {
                pokemonUrls = pokemonUrls.concat(pokeUrls.results);
            }
            offset += 20;
        }

        return pokemonUrls;
    }

    async function getOnePokemon(url: string) {
        const res = await fetch(url, options);
        return res.json();
    }

    let offset = 0;
    const pokes = await getAllPokemon();
    const filteredPokes = pokes.filter((p) => {
        return p.name.includes(props.query.toLowerCase());
    });
    pokemonList = await Promise.all(
        filteredPokes.map((p) => getOnePokemon(p.url)),
    );
    totalPages = Math.ceil(pokemonList.length / 16);

    if (props.currentPage > 1) {
        offset = Number(props.currentPage) * 16;
    } else {
        offset = 16;
    }
    pokemonList = pokemonList.slice(offset - 16, offset);

    return (
        <>
            <div
                className={`flex justify-center items-center place-self-center my-2`}
            >
                <PaginationBar totalPages={totalPages} />
            </div>
            <ul
                className={`w-[80vw] grid grid-cols-2 sm:grid-cols-4 overflow-scroll ring-2 ring-indigo-800/80 my-2 p-2 rounded place-items-center`}
            >
                {pokemonList.map((poke, index) => (
                    <li
                        className='w-fit px-4 py-2 flex flex-col items-center'
                        key={index}
                    >
                        <PokemonButton
                            poke={poke}
                            index={index}
                        />
                    </li>
                ))}
            </ul>
            <div
                className={`w-full flex justify-between items-center place-self-center md:hidden`}
            >
                <PaginationBar totalPages={totalPages} />
            </div>
        </>
    );
}
