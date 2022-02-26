import React, { useState, useEffect } from 'react'
import classes from '../styles/utils.module.css'
import Link from 'next/link'

function Page(props)  {

    return (
        <>
            <div className={classes.container}>
                <section>
                    <h4>Next.js Page Rendering</h4>
                    <ul>
                        <li>
                            <Link href="/pure-static">
                                <a className={classes.link}>Pure Static</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/static-site-generation">
                                <a className={classes.link}>Static-site Generation (Build-time) / Dynamic Routing</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/incremental-static-regeneration">
                                <a className={classes.link}>Incremental Static Regeneration</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/server-side-rendering">
                                <a className={classes.link}>Server-side Rendering</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/client-side-rendering">
                                <a className={classes.link}>Client-side Rendering</a>
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </>
    )
}

export async function getStaticProps() {

    const buildTime = (new Date()).toISOString()



    return { 
        props: {
            buildTime,
        },
        revalidate: 10,
    }
}

export default Page