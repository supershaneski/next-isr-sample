import Link from 'next/link'
import Head from 'next/head'
import { getAllPostsIds, getPostById } from '../../lib/posts'
import classes from '../../styles/utils.module.css'
import { useRouter } from 'next/router'

export default function Page({ post, dateModified }) {

    const router = useRouter()

    //console.log(post, dateModified)

    return (
        <>
            <Head>
                <title>Next.js | (Dynamic Route) { post.title }</title>
            </Head>
            <div className={classes.container}>
                <section>
                    <h4>Next.js Page Rendering</h4>
                </section>
                <section>
                    <button onClick={() => router.back()}>Back</button>
                    <Link href="/">
                        <a className={classes.link}>Back to home</a>
                    </Link>
                </section>
                <section>
                    <h4>{ post.title }</h4>
                    <p>{ post.date }</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </section>
                <section>
                    <p>Date Generated: { dateModified }</p>
                </section>
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const post = await getPostById(params.id)
    const dateModified = (new Date()).toISOString()
    return {
        props: {
            dateModified,
            post,
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostsIds()
    return {
        paths,
        fallback: false,
    }
}