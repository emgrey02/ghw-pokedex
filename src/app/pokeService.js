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
    const offset = Number(pageNum ?? '0') - 1 + '0'; //We're getting 10 pokemon at a time, easier to just add a 0 on to the string
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=15&offset=${offset}`;
    

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

// export async function getPokemonFromName(formData) {
//     const rawFormData = {
//         name: formData.get('name')
//     }

//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rawFormData.name}`);

//     if (!res.ok) {
//         throw new Error('failed to fetch individual pokemon');
//     }
//     const pokemon = await res.json();
//     return pokemon;
// }

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