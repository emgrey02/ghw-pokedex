export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='max-h-fit text-center mt-8'>
            {' '}
            Pokedex &copy; {currentYear}
        </footer>
    );
}
