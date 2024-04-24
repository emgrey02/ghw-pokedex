
export default function Loading() {
    return (
        <div id='loadingComp' className='w-full h-full grid gap-2 place-items-center'>
            <div className='flex gap-2 place-items-center'>
                <span className='animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-600 dark:border-zinc-300 '></span>
                <p>Loading...</p>
            </div>
        </div>
    )
}