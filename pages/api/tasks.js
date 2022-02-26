import { tasksRepo } from "../../lib/dummy"

export default function handler(req, res) {
    const items = tasksRepo.getTasks()
    res.status(200).json({
        items: items,
    })
}