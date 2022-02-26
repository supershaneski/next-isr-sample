import Link from 'next/link'
import classes from '../styles/utils.module.css'
import { getSortedPosts } from '../lib/posts'

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
                    <h4>Static Site Generation</h4>
                    <p>
                        The pages using static site generation are pre-rendered at build-time.
                        The JSON file holding the result for <strong>getStaticProps</strong> is also generated at the same time.
                        This means that in production mode, <strong>getStaticProps</strong> will not be called anymore.
                    </p>
                    <section>
                        <h4>Content List</h4>
                        <p>Date Generated: { dateModified }</p>
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
    const posts = getSortedPosts()
    const dateModified = (new Date()).toISOString()
    return {
        props: {
            dateModified,
            posts,
        }
    }
}