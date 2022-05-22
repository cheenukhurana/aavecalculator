import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <div className='bg-gradient-to-br from-[#5f3473] to-[#71c1d6] h-screen'>
            <div className='max-w-2xl mx-auto py-4'>
                <Head>
                    <title>Aave Calculator</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <header className="text-center">
                    <h1>Aave Calculator</h1>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}