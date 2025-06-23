import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function PaginationBar() {
    const [isBackDisabled, setBackDisability] = useState(false);
    const [isNextDisabled, setNextDisability] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    let searchParams = useSearchParams();
    let currentPage = searchParams.get('page') || '1';
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        if (Number(currentPage) <= 1) {
            setBackDisability(true);
            setNextDisability(false);
            return;
        } else if (Number(currentPage) >= 82) {
            setNextDisability(true);
            setBackDisability(false);
            return;
        } else {
            setBackDisability(false);
            setNextDisability(false);
        }
    }, [currentPage]);

    const changePage = (e) => {
        let button = e.currentTarget.getAttribute('data-id');

        if (button == 'prev') {
            params.set('page', (Number(currentPage) - 1).toString());
            router.push(pathname + '?' + params.toString());
        } else if (button == 'next') {
            params.set('page', (Number(currentPage) + 1).toString());
            router.push(pathname + '?' + params.toString());
        }
    };

    const pages = Array.from({ length: 5 }, (_, i) => {
        let pageNum = Number(currentPage);
        if (pageNum <= 3) return i + 1;
        if (pageNum >= 80) return i + 78;
        else return i - 1 - (pageNum === 1 ? 0 : 1) + pageNum;
    });

    return (
        <div className='flex flex-row justify-center align-center h-full w-full my-2'>
            <ul className='grid grid-cols-11 place-items-center h-min w-full'>
                <li>
                    <Link href={`/?page=1`}>
                        <svg
                            className='stroke-slate-700 hover:stroke-slate-900 bg-transparent hover:bg-indigo-900/60 rounded border-slate-700 disabled:border-slate-500 disabled:bg-inherit transition focus:outline-none focus:ring-2 ring-slate-800 hover:fill-slate-900  disabled:fill-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            width='40'
                            height='40'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <title>go to first page</title>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1'
                                d='M4 4v16m4-8h12M8 12l4-4m-4 4l4 4'
                            ></path>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Button
                        id='prev'
                        onClick={changePage}
                        disabled={isBackDisabled}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='-4.5 0 20 20'
                        >
                            <title>go to previous page</title>
                            <g
                                fillRule='evenodd'
                                stroke='none'
                                strokeWidth='1'
                            >
                                <g transform='translate(-345 -6679)'>
                                    <g transform='translate(56 160)'>
                                        <path d='M299.634 6519.292a1.063 1.063 0 00-1.464 0l-8.563 8.264a1.95 1.95 0 000 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 00.01-1.425l-7.893-7.617a.975.975 0 010-1.414l7.83-7.557a.974.974 0 000-1.413'></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </Button>
                </li>
                <li>
                    <div className={`${+currentPage <= 3 ? 'invisible' : ''}`}>
                        ...
                    </div>
                </li>
                {pages.map((p) => (
                    <li
                        className='hover:bg-slate-900/20  rounded transition'
                        key={p}
                    >
                        <Link
                            className={`block p-2 ${
                                p == +currentPage
                                    ? 'text-xl underline font-bold text-indigo-950/80 '
                                    : ''
                            } w-min`}
                            href={`/?page=${p}`}
                        >
                            {p}
                        </Link>
                    </li>
                ))}
                <li>
                    <div className={`${+currentPage >= 80 ? 'invisible' : ''}`}>
                        ...
                    </div>
                </li>
                <li>
                    <Button
                        id='next'
                        onClick={changePage}
                        disabled={isNextDisabled}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='-4.5 0 20 20'
                        >
                            <title>go to next page</title>
                            <g
                                fillRule='evenodd'
                                stroke='none'
                                strokeWidth='1'
                            >
                                <g transform='translate(-305 -6679)'>
                                    <g transform='translate(56 160)'>
                                        <path d='M249.366 6538.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 000-2.827l-8.625-8.325a1.063 1.063 0 00-1.454-.01.976.976 0 00-.011 1.425l7.894 7.617a.975.975 0 010 1.414l-7.831 7.557a.974.974 0 000 1.413'></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </Button>
                </li>
                <li>
                    <Link href={`/?page=82`}>
                        <svg
                            className='stroke-slate-700 hover:stroke-slate-900 bg-transparent hover:bg-indigo-900/60 rounded border-slate-700 disabled:border-slate-500 disabled:bg-inherit transition focus:outline-none focus:ring-2 ring-slate-800 hover:fill-slate-900  disabled:fill-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            width='40'
                            height='40'
                            viewBox='0 0 24 24'
                        >
                            <title>go to last page</title>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1'
                                d='M20 4v16M4 12h12m0 0l-4-4m4 4l-4 4'
                            ></path>
                        </svg>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
