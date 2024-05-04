'use server';
import axios from 'axios';

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

export async function getCurrentPokemon(pageNum) {
    let offset;

    if (pageNum > 1) {
        offset = Number(pageNum - 1) * 16;
    } else {
        offset = 0;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=16&offset=${offset}`;
    console.log(url);

    const pokemonUrls = await fetch(url).then((res) => res.json());
    const pokemon = await Promise.all(
        pokemonUrls.results.map((p) => getOnePokemon(p.url)),
    );
    return pokemon;
}

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

const freeconvert = axios.create({
    baseURL: 'https://api.freeconvert.com/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
});

export async function convert(fileURL) {
    try {
        const jobResponse = await freeconvert.post('/process/jobs', {
            tasks: {
                myImport1: {
                    operation: 'import/url',
                    url: fileURL,
                    filename: 'pokecry.ogg',
                },
                myConvert1: {
                    operation: 'convert',
                    input: 'myImport1',
                    input_format: 'ogg',
                    output_format: 'mp3',
                },
                myExport1: {
                    operation: 'export/url',
                    input: 'myConvert1',
                },
            },
        });

        const jobId = jobResponse.data.id;
        console.log('created job', jobId);

        const job = await waitForJobByPolling(jobId);

        if (job.status === 'completed') {
            console.log('Job completed.');
            const exportTask = job.tasks.find((t) => t.name === 'myExport1');
            return exportTask.result.url;
        } else {
            console.log(
                `Job failed. [${job.result.errorCode}] - ${job.result.msg.trim()}`,
            );
        }

        for (const t of job.tasks) {
            if (t.status === 'completed') {
                console.log(
                    `Task ${t.name} completed. result.url: ${t.result.url}`,
                );
            } else {
                console.log(
                    `Task ${t.name} failed. [${t.result.errorCode}] - ${t.result.msg.trim()}`,
                );
            }
        }

        async function waitForJobByPolling(jobId) {
            for (let i = 0; i < 10; i++) {
                await waitForSeconds(2);
                const jobGetResponse = await freeconvert.get(
                    `/process/jobs/${jobId}`,
                );

                const job = jobGetResponse.data;
                if (job.status === 'completed' || job.status === 'failed') {
                    // Return the latest job information.
                    return job;
                }
            }

            throw new Error('Poll timeout');
        }

        async function waitForSeconds(seconds) {
            await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
        }
    } catch (error) {
        console.log(`!!!ERROR!!! ${error.message} !!!ERROR!!!`);
        return null;
    }
}
