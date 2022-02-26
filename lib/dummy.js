import fs from 'fs'
import path from 'path'
import record from '../contents/dummy/mock.json'
import { getSimpleId } from './utils'

export const tasksRepo = {
    getTasks: () => record.data,
    getTaskById: (id) => record.data.find(x => x.id.toString() === id.toString()),
    addTask,
    deleteTask,
}

function addTask(task) {

    const newTask = {
        id: getSimpleId(),
        date: (new Date()).toISOString(),
        text: task
    }

    record.data.push(newTask)

    const jsonFile = path.join(process.cwd(), 'contents/dummy/mock.json')
    fs.writeFileSync(jsonFile, JSON.stringify(record, null, 4))

}

function deleteTask(id) {

    record.data = record.data.filter(data => data.id !== id)
    
    const jsonFile = path.join(process.cwd(), 'contents/dummy/mock.json')
    fs.writeFileSync(jsonFile, JSON.stringify(record, null, 4))

}