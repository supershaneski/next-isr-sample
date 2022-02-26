import { tasksRepo } from "../../lib/dummy"

/*
export default handler({ 
    post: addTask,
})*/

export default function handler(req, res) {

    if(req.method !== 'POST') {
        res.status(405).send({message: "Shit fuck"})
        return;
    }

    const { task } = req.body;

    tasksRepo.addTask(task)

    return res.status(200).json({})

}