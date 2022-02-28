import Link from 'next/link'
import classes from '../styles/utils.module.css'
import { getAllPosts } from '../lib/posts'

export default function Page({ posts, dateModified }) {

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
                    <h4>Incremental Static Regeneration</h4>
                    <p>
                        If you noticed, this is the same as for Static-site Generation.
                        Except I added <strong>revalidate</strong> parameter in <strong>getStaticProps</strong>, set with value 120, to update the page every 2 minutes.
                    </p>
                    <section>
                        <h4>Content List</h4>
                        <p>Date Generated: { dateModified } (This should change by the interval set in <strong>revalidate</strong> at <strong>getStaticProps</strong>)</p>
                        <ol>
                        {
                            posts.map(item => {
                                return (
                                    <li key={item.id}>
                                        <div className={classes.post}>
                                            <Link href={`/posts/${item.id}`}>
                                                <a className={classes.link}>
                                                    <h4>{ item.title }</h4>
                                                </a>
                                            </Link>
                                            <p>{ item.date }</p>
                                            <p>{ item.excerpt }</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </ol>
                    </section>
                </section>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const tmp = getAllPosts()
    const dateModified = (new Date()).toISOString()
    return {
        props: {
            dateModified: tmp.dateModified,
            posts: tmp.items
        },
        revalidate: 120,
    }
}