import { useEffect, useState } from 'react'
import Link from 'next/link'
import classes from '../styles/utils.module.css'
import { getTasks, addTask } from '../lib/utils'

export default function Page() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [tasks, setTasks] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [taskItem, settaskItem] = useState("")
    const [fetchDate, setFetchDate] = useState("")

    useEffect(() => {
        
        getTaskData()

    }, [])

    /*useEffect(() => {

        const timer = setTimeout(() => {

            setIsLoaded(prev => !prev)

        }, 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [tasks])*/

    const getTaskData = () => {

        getTasks().then(data => {
            
            setIsLoaded(true)
            setTasks(data.items)
            setFetchDate(data.date)

        }).catch(error => {
            console.log(error)
        })

    }

    const handleSubmit = () => {

        setIsAdded(true)

        addTask(taskItem).then(data => {

            setOpenAdd(false)
            getTaskData()
            setIsAdded(false)

        }).catch(error => { 
            console.log(error)
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
                    <h4>Client-side Rendering</h4>
                    <p>
                        The data will be rendered right after mounting.
                    </p>
                </section>
                {
                    !isLoaded &&
                    <section>
                        <p>Loading...</p>
                    </section>
                }
                {
                    isLoaded &&
                    <section>
                        <p>Fetched Date: { fetchDate }</p>
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
                }
                <div className={classes.fab}>
                    <button onClick={() => setOpenAdd(true)}>&#43;</button>
                </div>
                {
                    openAdd &&
                    <div className={classes.dialogContainer}>
                        <div className={classes.dialog}>
                            <div className={classes.contents}>
                                <div className={classes.dialogTitle}>
                                    <h4>Add Task</h4>
                                </div>
                                <div className={classes.dialogForm}>
                                    <textarea value={taskItem} onChange={e => settaskItem(e.target.value)} />
                                </div>
                                <div className={classes.dialogAction}>
                                    <button onClick={handleSubmit}>Submit</button>
                                    <button onClick={() => setOpenAdd(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    isAdded &&
                    <div className={classes.loader}>
                        <div className={classes.adding}>Adding...</div>
                    </div>
                }
            </div>
        </>
    )
}