import Link from 'next/link'
import classes from '../styles/utils.module.css'
import { tasksRepo } from '../lib/dummy'

export default function Page({ date, tasks }) {

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
                    <h4>Server-side Rendering [SSR]</h4>
                    <p>
                        The pages are generated on each request.<br />
                        However, the content is pre-rendered on the server.
                    </p>
                    <section>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>date</th>
                                    <th>task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.length === 0 &&
                                    <tr>
                                        <td colSpan={3}>No tasks found</td>
                                    </tr>
                                }
                                {
                                    tasks.length > 0 &&
                                    tasks.map(task => {
                                        const odate = new Date(task.date)
                                        return (
                                            <tr key={task.id}>
                                                <td>{ task.id }</td>
                                                <td>{ odate.toDateString() }</td>
                                                <td>{ task.text }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                    <p>Date Generated: { date }</p>
                </section>
            </div>
        </>
    )
}

export async function getServerSideProps() {

    const tasks = tasksRepo.getTasks()

    const date = (new Date()).toISOString()

    return {
        props: {
            date,
            tasks
        }
    }
}