'use server'

export async function getPokemon(url) {
    const res = await fetch(url, {
        method: 'get'
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

export async function getCurrentPokemon(pageNum) {
    let offset;
    
    if (pageNum >= 2) {
        offset = Number(pageNum - 1) * 20;
    } else {
        offset = 0;
    }
    console.log(offset);
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;

    const pokemonUrls = await fetch(url).then((res) => res.json());
    const pokemon = await Promise.all(
        pokemonUrls.results.map((p) => getOnePokemon(p.url))
    );
    return pokemon;
};

export async function getOnePokemon(url) {
    const res = await fetch(url);
    return res.json();
}

export async function getAllPokemon(url) {
    const pokemon = await getPokemon(url);
    return fetchPokemonData(pokemon.results);
}

export async function getPokemonFromSearch(name) {
    if (name === '') {
        return 'invalid search';
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
        return `That's not a pokemon. Try searching again.`;
    }
    const pokemon = await res.json();
    return pokemon;
}