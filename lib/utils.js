
const remoteServer = 'http://192.168.1.80:5000'

export function getSimpleId() {
    return Math.random().toString(26).slice(2);
}

export async function getTasks() {
    
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    const res = await fetch(remoteServer + '/api/tasks', 
    { 
        method: 'GET',
        headers: header,
    })
    
    const ret = await res.json()

    return ret
}

export async function addTask(task) {
    
    const res = await fetch(remoteServer + '/api/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: task,
        })
    })

    return await res.json()
}
