export default function LoadingPage() {
    return (
        <div className='w-dvw h-dvh bg-gradient-to-r from-cyan-300 to-violet-400 dark:from-cyan-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 grid gap-2 place-items-center'>
            <div className='flex gap-2 place-items-center'>
                <span className='animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-600 dark:border-zinc-300 '></span>
                <p>Loading...</p>
            </div>
        </div>
    );
}
