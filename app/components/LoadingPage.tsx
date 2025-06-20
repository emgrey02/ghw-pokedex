export default function LoadingPage() {
    return (
        <div className='w-full h-full text-slate-800  grid gap-2 place-items-center'>
            <div className='flex gap-2 place-items-center'>
                <span className='animate-spin w-6 h-6 rounded-full border-t-2 border-r-2 border-zinc-600'></span>
                <p>Loading...</p>
            </div>
        </div>
    );
}
