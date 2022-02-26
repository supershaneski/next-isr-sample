import { useState, useEffect } from 'react'
import Link from 'next/link'
import classes from '../styles/utils.module.css'

const callRebuild = async (token) => {
    const res = await fetch(`/api/revalidate?secret=${token}`)
    return await res.json()
}

export default function Page({ secret }) {

    const [errorMessage, setErrorMessage] = useState('')

    const handleRebuild = () => {

        callRebuild(secret).then(data => {

            setErrorMessage("Site rebuild successful")

        }).catch(error => {
            console.log(error)

            setErrorMessage("Failed to rebuild")
        })

    }

    return (
        <>
            <div className={classes.container}>
                <section>
                    <h4>Next.js Page Rendering</h4>
                </section>
                <section>
                    <Link href="/">
                        <a className={classes.link}>Back to home</a>
                    </Link>
                </section>
                <section>
                    <h4>On-demand Incremental Static Regeneration</h4>
                    <p>
                        The button below will call our <strong>revalidate</strong> API route to trigger on-demand ISR.
                        In actual circumstance, this function should not be available to every users.
                    </p>
                </section>
                <section className={classes.buildPanel}>
                    <div>
                        <button onClick={handleRebuild} className={classes.build}>Rebuild Site</button>
                        <p className={classes.error}>{ errorMessage }</p>
                    </div>
                </section>
            </div>
        </>
    )
}


export async function getStaticProps() {
    
    const secret = process.env.ENV_SECRET

    return {
        props: {
            secret
        }
    }
}