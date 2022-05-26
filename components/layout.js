import Head from 'next/head'
import Script from 'next/script'

export default function Layout({ children }) {
    return (
        <div className='bg-gradient-to-br from-[#5f3473] to-[#71c1d6] h-screen'>
            <div className='max-w-xl mx-auto py-4'>
                <Head>
                    <title>Aave Calculator</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <header className="text-center">
                    <h1 className="text-white text-3xl">Aave Calculator</h1>
                    <h6 className="text-[#dbe1e8] text-sm mt-4">Calculate liquidation price, loan amount or collateral required</h6>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}