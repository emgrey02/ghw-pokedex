import { Suspense } from 'react';
import PokemonButton from './PokemonButton';
import Loading from './Loading';
import PaginationBar from './PaginationBar';
import SearchResults from './SearchResults';
import AllPokemon from './AllPokemon';

export default async function PokemonList(props: {
    pagePromise: Promise<{ page: number; query?: string }>;
}) {
    const pageNumObj = await props.pagePromise;
    const page = pageNumObj.page;
    const query = pageNumObj.query;

    return (
        <>
            {query ?
                <Suspense fallback={<Loading />}>
                    <SearchResults
                        query={query}
                        currentPage={page}
                    />
                </Suspense>
            :   <Suspense fallback={<Loading />}>
                    <AllPokemon currentPage={page} />
                </Suspense>
            }
        </>
    );
}
