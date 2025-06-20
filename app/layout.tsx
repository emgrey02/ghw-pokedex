import './globals.css';
import Image from 'next/image';
import dex from '../public/pokeDEX.png';
import PokemonSearch from './components/PokemonSearch';

export const metadata = {
    title: 'Pokedex',
    description: 'A searchable index of all pokemon.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='bg-purple-100 px-4 py-8 md:px-16 transition-all flex flex-col items-center'>
                <div className=' flex gap-4 items-center'>
                    <Image
                        priority
                        width='80'
                        height='80'
                        alt='pokedex icon'
                        src={dex}
                    />
                    <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                </div>
                <PokemonSearch />
                {children}
            </body>
        </html>
    );
}
