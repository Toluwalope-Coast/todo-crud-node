const { default: mongoose } = require("mongoose");
const tasks = require("../models/tasks_model");


//Get all tasks
const getTasks = async (req, res) => {
    const tasks = await tasks.find({}).sort({ createdAt: -1 });

    res.status(200).json(tasks)
}
//Get a single tasks
const getSingleTasks = async (req, res) => {
    const { id } = req.params

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tasks' })
    }

    // find id is valid
    const tasks = await tasks.findById(id)

    if (!tasks) {
        return res.status(404).json({ error: 'No such tasks' })
    }
    res.status(200).json(tasks)
}

//Create a new tasks

const createTasks = async (req, res) => {
    //extracting the data from the request
    const { title, categoryId, status } = req.body;

    //Add document to db
    try {
        const tasks = await tasks.create({ title, categoryId, status });
        res.status(201).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Delete a tasks
const deleteTasks = async (req, res) => {
    const { id } = req.params

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tasks' })
    }

    // find id is valid
    const tasks = await tasks.findOneAndDelete({ _id: id })

    if (!tasks) {
        return res.status(404).json({ error: 'No such tasks' })
    }
    res.status(200).json(tasks)

}


//Update a tasks
const UpdateTasks = async (req, res) => {
    const { id } = req.params

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tasks' })
    }

    // find id is valid
    const tasks = await tasks.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!tasks) {
        return res.status(404).json({ error: 'No such tasks' })
    }
    res.status(200).json(tasks)
}

module.exports = {
    createTasks,
    getTasks,
    getSingleTasks,
    deleteTasks,
    UpdateTasks
}