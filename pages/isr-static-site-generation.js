import Link from 'next/link'
import classes from '../styles/utils.module.css'
import { getTasks } from '../lib/utils'

export default function Page({ tasks, dateModified, fetchDate }) {

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
                    <h4>Static Site Generation (For On-demand ISR verification)</h4>
                    <p>
                        The data is similar from the server-side rendering and client-side rendering pages.
                        The data can change and it is easy to check if indeed on-demand ISR works.
                        The resulting page should be the same as the client-side rendering page.
                    </p>
                    <section>
                        <h4>Task Data</h4>
                        <p>Date Generated: { dateModified }</p>
                        <p>Date Fetched: { fetchDate }</p>
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
                                            <td>{ [odate.toDateString(), odate.toLocaleTimeString()].join(' ') }</td>
                                            <td>{ task.text }</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </section>
                </section>
            </div>
        </>
    )
}

export async function getStaticProps() {
    
    const tasks = await getTasks() //tasksRepo.getTasks()
    
    const dateModified = (new Date()).toISOString()
    
    return {
        props: {
            dateModified,
            fetchDate: tasks.date,
            tasks: tasks.items,
        }
    }
}