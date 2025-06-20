'use client';
import PokemonList from './PokemonList';
import PaginationBar from './PaginationBar';

export default function PokemonListContainer({ pokemonList }) {
    return (
        <>
            <div
                className={`w-full flex justify-between items-center place-self-center`}
            >
                <PaginationBar />
            </div>
            <PokemonList pokeList={pokemonList} />

            <div
                className={`w-full flex justify-between items-center place-self-center md:hidden`}
            >
                <PaginationBar />
            </div>
        </>
    );
}
