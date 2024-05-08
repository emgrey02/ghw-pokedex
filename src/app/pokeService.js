'use server';

export async function getPokemon(url) {
    const res = await fetch(url, {
        method: 'get',
    });
    if (!res.ok) {
        throw new Error('failed to fetch general pokemon list data');
    }
    const pokemon = await res.json();
    return pokemon;
}

async function fetchPokemonData(pokemonList) {
    let pokemonArray = [];
    for (let i = 0; i < pokemonList.length; i++) {
        let url = pokemonList[i].url;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('failed to fetch individual pokemon data');
        }
        pokemonArray.push(await res.json());
    }
    return pokemonArray;
}

export async function getAllPokemon(url) {
    const pokemon = await getPokemon(url);
    return fetchPokemonData(pokemon.results);
}
