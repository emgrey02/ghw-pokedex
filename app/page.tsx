import PokemonSearch from './components/PokemonSearch';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { Suspense } from 'react';
import PokemonList from './components/PokemonList';

export default async function Page(props: {
    searchParams: Promise<{ page: number }>;
}) {
    return (
        <>
            <PokemonSearch />
            <main
                id='main'
                className={`text-slate-800`}
            >
                <Suspense fallback={<Loading />}>
                    <PokemonList pagePromise={props.searchParams} />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
