'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            className='cursor-pointer z-20 font-semibold bg-indigo-900/60 hover:bg-indigo-900/30 text-slate-100 rounded transition-all focus:outline-none focus:ring-4 ring-indigo-950 border border-slate-800 px-7 py-3'
            onClick={router.back}
        >
            Back
        </button>
    );
}
