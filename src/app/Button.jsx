import { forwardRef } from 'react';

const Button = forwardRef(function Button({ id, onClick, text, disabled, children }, ref) {
    return (
        <button className='text-slate-900 dark:text-slate-300 hover:text-slate-300 dark:hover:text-slate-700 bg-transparent dark:bg-transparent hover:bg-indigo-900/60 dark:hover:bg-indigo-400 rounded border-slate-700 px-2 disabled:border-slate-500 dark:disabled:border-slate-700 disabled:bg-inherit disabled:text-slate-500 dark:disabled:text-slate-600 dark:hover:disabled:bg-transparent transition focus:outline-none focus:ring-2 ring-slate-800 dark:ring-indigo-200 py-2' ref={ref} disabled={disabled} id={id} onClick={onClick}>{text}{children}</button>
    )
});

export default Button;