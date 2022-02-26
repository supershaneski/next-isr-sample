import { useEffect, useState } from 'react'
import Link from 'next/link'
import classes from '../styles/utils.module.css'

const getTasks = async () => {
    const res = await fetch('/api/tasks')
    return await res.json()
}

const addTask = async (task) => {
    const res = await fetch('/api/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: task,
        })
    })
    return await res.json()
}

export default function Page() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [tasks, setTasks] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [taskItem, settaskItem] = useState("")

    useEffect(() => {
        
        getTaskData()

    }, [])

    useEffect(() => {

        const timer = setTimeout(() => {

            setIsLoaded(prev => !prev)

        }, 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [tasks])

    const getTaskData = () => {

        getTasks().then(data => {
            
            setTasks(data.items)

        }).catch(error => {
            console.log(error)
        })

    }

    const handleSubmit = () => {

        addTask(taskItem).then(data => {

            setIsLoaded(false)
            getTaskData()
            setOpenAdd(false)

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
            </div>
        </>
    )
}