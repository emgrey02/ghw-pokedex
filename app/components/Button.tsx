export default function Button({ id, onClick, disabled, children }) {
    return (
        <button
            className='bg-transparent hover:bg-indigo-900/60 rounded border-slate-700 p-2 disabled:border-slate-500 disabled:bg-inherit transition focus:outline-none focus:ring-2 ring-slate-800  fill-slate-700 hover:fill-slate-900  disabled:fill-gray-400'
            disabled={disabled}
            data-id={id}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
