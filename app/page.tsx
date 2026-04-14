import PokemonSearch from './components/PokemonSearch';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { Suspense } from 'react';
import PokemonList from './components/PokemonList';

export default async function Page() {
    return (
        <>
            <PokemonSearch />
            <main
                id='main'
                className={`text-slate-800`}
            >
                <Suspense fallback={<Loading />}>
                    <PokemonList />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
