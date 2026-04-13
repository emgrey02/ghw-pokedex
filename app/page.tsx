import PokemonSearch from './components/PokemonSearch';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { Suspense } from 'react';
import PaginationBar from './components/PaginationBar';
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
                <div
                    className={`w-full flex justify-between items-center place-self-center`}
                >
                    <PaginationBar />
                </div>
                <Suspense fallback={<Loading />}>
                    <PokemonList pagePromise={props.searchParams} />
                </Suspense>
                <div
                    className={`w-full flex justify-between items-center place-self-center md:hidden`}
                >
                    <PaginationBar />
                </div>
            </main>
            <Footer />
        </>
    );
}
