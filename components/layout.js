import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <div className='bg-gradient-to-br from-[#5f3473] to-[#71c1d6] h-screen'>
            <Head>
                <title>Aave Calculator</title>
                <link rel="icon" href="/aavecal-logo.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <div className='max-w-xl mx-auto py-4'>
                <header className="text-center">
                    <h1 className="text-white text-3xl">Aave Calculator</h1>
                    <h6 className="text-[#dbe1e8] text-sm mt-4">Calculate liquidation price, loan amount or collateral required</h6>
                </header>
                <main>
                    {children}
                </main>
            </div>
            <footer>
                <div className="absolute right-10 bottom-4">
                    <a href="https://twitter.com/cheenukhurana" target="_blank"><i className="fa fa-twitter text-lg cursor-pointer"></i></a>
                </div>
            </footer>
        </div>
    )
}