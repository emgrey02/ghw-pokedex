export default function Button({ id, onClick, disabled, children }) {
    return (
        <button
            className='bg-transparent dark:bg-transparent dark:disabled:hover:bg-transparent hover:bg-indigo-900/60 dark:hover:bg-indigo-400 rounded border-slate-700 p-2 disabled:border-slate-500 dark:disabled:border-slate-700 disabled:bg-inherit dark:hover:disabled:bg-transparent transition focus:outline-none focus:ring-2 ring-slate-800 dark:ring-indigo-200  fill-slate-700 hover:fill-slate-900 dark:fill-slate-400 disabled:fill-gray-400 dark:disabled:fill-slate-700'
            disabled={disabled}
            data-id={id}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
