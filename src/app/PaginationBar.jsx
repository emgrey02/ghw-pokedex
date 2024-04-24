import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Button from '@/app/Button';

export default function PaginationBar({ page }) {
    const [isBackDisabled, setBackDisability] = useState(false);
    const [isNextDisabled, setNextDisability] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    let pageString = page.toString();
    let searchParams = useSearchParams();
    let currentPage = searchParams.get('page');
    console.log(currentPage)

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);

        return params.toString()
    }, [searchParams])

    useEffect(() => {
        if (Number(page) <= 1) {
            setBackDisability(true); 
            return;
        } else if (Number(page) >= 114) {
            setNextDisability(true);
            return;
        }
    }, [page])

    const changePage = (e) => {
        let button = e.target.id;

        if (Number(page) <= 1) {
            setBackDisability(true);
            return;
        } else if (Number(page) >= 114) {
            setNextDisability(true);
            return;
        }

        if (button == 'prev') router.push(pathname + '?' + createQueryString('page', Number(page) - 1));
        if (button == 'next') router.push(pathname + '?' + createQueryString('page', Number(page) + 1));
    }

    const pages = Array.from({ length: 7 }, (_, i) => {
        let pageNum = Number(pageString);
        if (pageNum <= 4) return i + 1;
        if (pageNum >= 111) return i + 108;
        else return (i-2) - (pageNum === 1 ? 0 : 1) + pageNum;
    });

    return ( 
        <div className='flex flex-row justify-center align-center h-full w-full'>
            <ul className='grid grid-cols-13 place-items-center h-min w-full'> 
                <Link className='hover:bg-indigo-400 hover:text-slate-800 hover:font-bold p-2 rounded-lg transition-all disabled:text-slate-300' href={`/?page=1`} page={1} disabled={isBackDisabled}>First</Link>
                <Button id='prev' onClick={changePage} text='&#129168;' disabled={isBackDisabled} />
                <div className={`${page <= 5 ? 'invisible' : ''}`} >...</div>
                {pages.map((p) => (
                    <li className='w-min' key={p}>
                        <Link className={` hover:bg-slate-900/20 dark:hover:bg-slate-900 p-2 rounded-lg ${p == currentPage ? 'text-xl outline outline-slate-500 dark:outline-slate-800 font-bold dark:text-indigo-400' : ''} w-min`} href={`/?page=${p}`} page={p}>{p}</Link>            
                    </li>
                ))}
                <div className={`${page >= 111 ? 'invisible' : ''}`}>...</div>
                <Button id='next' onClick={changePage} text='&#129170;' disabled={isNextDisabled} />
                <Link className={`hover:bg-indigo-400 hover:text-slate-800 hover:font-bold p-2 rounded-lg transition-all disabled:text-slate-300`} href={`/?page=114`} disabled={isNextDisabled} page={114}>Last</Link>
            </ul>
        </div>        
    )
}
