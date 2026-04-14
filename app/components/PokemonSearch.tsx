'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PokemonSearch() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    async function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
            params.set('page', '1');
        } else {
            params.delete('query');
            params.set('page', '1');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <form className='grid gap-2 w-80 my-10 relative'>
                <label
                    htmlFor='name'
                    className='mb-3'
                >
                    Search for a Pokemon
                </label>
                <input
                    className='bg-slate-100 border-2 border-slate-600 p-2 rounded focus:outline-none focus:ring-2 ring-slate-950  transition-all'
                    name='name'
                    id='name'
                    type='text'
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </form>
        </>
    );
}
