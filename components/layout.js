import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Aave Calculator</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <header className={styles.header}>
                <h1>Aave Calculator</h1>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}