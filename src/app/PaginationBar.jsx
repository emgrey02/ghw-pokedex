import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/app/Button';

export default function PaginationBar() {
    const [isBackDisabled, setBackDisability] = useState(false);
    const [isNextDisabled, setNextDisability] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    let searchParams = useSearchParams();
    let currentPage = searchParams.get('page') || 1;
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        if (Number(currentPage) <= 1) {
            setBackDisability(true); 
            return;
        } else if (Number(currentPage) >= 114) {
            setNextDisability(true);
            return;
        }
    }, [currentPage])

    const changePage = (e) => {
        let button = e.target.id;

        if (Number(currentPage) < 1) {
            setBackDisability(true);
            return;
        } else if (Number(currentPage) > 114) {
            setNextDisability(true);
            return;
        }

        if (button == 'prev') {
            params.set('page', Number(currentPage) - 1)
            router.push(pathname + '?' + params.toString());
        } else if (button == 'next') {
            params.set('page', Number(currentPage) + 1);
            router.push(pathname + '?' + params.toString());
        }
    }

    const pages = Array.from({ length: 5 }, (_, i) => {
        let pageNum = Number(currentPage);
        if (pageNum <= 3) return i + 1;
        if (pageNum >= 112) return i + 110;
        else return (i-1) - (pageNum === 1 ? 0 : 1) + pageNum;
    });

    return ( 
        <div className='flex flex-row justify-center align-center h-full w-full'>
            <ul className='grid grid-cols-11 place-items-center h-min w-full'> 
                <Link className='hover:bg-indigo-400 hover:text-slate-800 hover:font-bold py-2 rounded-lg transition-all disabled:text-slate-300' href={`/?page=1`} page={1} disabled={isBackDisabled}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <path
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M4 4v16m4-8h12M8 12l4-4m-4 4l4 4"
                        ></path>
                    </svg>
                </Link>
                <Button id='prev' onClick={changePage} disabled={isBackDisabled}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="-4.5 0 20 20"
                        >
                        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                            <g fill="#fff" transform="translate(-345 -6679)">
                            <g transform="translate(56 160)">
                                <path d="M299.634 6519.292a1.063 1.063 0 00-1.464 0l-8.563 8.264a1.95 1.95 0 000 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 00.01-1.425l-7.893-7.617a.975.975 0 010-1.414l7.83-7.557a.974.974 0 000-1.413"></path>
                            </g>
                            </g>
                        </g>
                    </svg>
                </Button>
                <div className={`${currentPage <= 5 ? 'invisible' : ''}`} >...</div>
                {pages.map((p) => (
                    <li className='w-min' key={p}>
                        <Link className={` hover:bg-slate-900/20 dark:hover:bg-slate-900 p-2 rounded-lg ${p == currentPage ? 'text-xl underline font-bold dark:text-indigo-400' : ''} w-min`} href={`/?page=${p}`} page={p}>{p}</Link>            
                    </li>
                ))}
                <div className={`${currentPage >= 111 ? 'invisible' : ''}`}>...</div>
                <Button id='next' onClick={changePage} disabled={isNextDisabled}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="-4.5 0 20 20"
                        >
                        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                            <g fill="#fff" transform="translate(-305 -6679)">
                            <g transform="translate(56 160)">
                                <path d="M249.366 6538.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 000-2.827l-8.625-8.325a1.063 1.063 0 00-1.454-.01.976.976 0 00-.011 1.425l7.894 7.617a.975.975 0 010 1.414l-7.831 7.557a.974.974 0 000 1.413"></path>
                            </g>
                            </g>
                        </g>
                    </svg>
                </Button>
                <Link className={`hover:bg-indigo-400 hover:text-slate-800 hover:font-bold py-2 rounded-lg transition-all disabled:text-slate-300`} href={`/?page=114`} disabled={isNextDisabled} page={114}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <path
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M20 4v16M4 12h12m0 0l-4-4m4 4l-4 4"
                        ></path>
                    </svg>
                </Link>
            </ul>
        </div>        
    )
}
