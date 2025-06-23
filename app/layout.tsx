import './globals.css';
import Image from 'next/image';
import dex from '../public/pokeDEX.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pokedex',
    description: 'A searchable index of all pokemon.',
    generator: 'Next.js',
    applicationName: 'Pokedex',
    keywords: ['pokedex', 'pokemon'],
    creator: 'Emma Grey',
    metadataBase: new URL('https://ghw-pokedex.vercel.app'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/',
        },
    },
    openGraph: {
        title: 'Pokedex',
        description: 'A searchable index of all pokemon.',
        url: 'https://ghw-pokedex.vercel.app',
        siteName: 'Pokedex',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='bg-purple-100 px-4 py-8 md:px-16 transition-all flex flex-col items-center'>
                <header className='flex gap-4 items-center place-self-start'>
                    <Image
                        priority
                        width='80'
                        height='80'
                        alt='pokedex icon'
                        src={dex}
                    />
                    <h1 className='text-3xl font-medium py-4'>Pokedex</h1>
                </header>
                {children}
            </body>
        </html>
    );
}
