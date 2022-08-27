const { default: mongoose } = require("mongoose");
const tasks = require("../models/task_model");
const category = require("../models/category_model");

//Get all tasks
const getTasks = async (req, res) => {
    const task = await tasks.find({}).sort({ createdAt: -1 });

    res.status(200).json(task);
};
//Get a single tasks
const getSingleTasks = async (req, res) => {
    const { id } = req.params;

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such tasks" });
    }

    // find id is valid
    const task = await tasks.findById(id);

    if (!task) {
        return res.status(404).json({ error: "No such tasks" });
    }
    res.status(200).json(task);
};

//Create a new tasks

const createTasks = async (req, res) => {
    //extracting the data from the request
    const { title, category_id, task_status } = req.body;

    //check if category id exists

    const categories = await category.findById(category_id);

    if (!categories) {
        return res.status(404).json({ error: "No such category for the task" });
    }

    //Add document to db
    try {
        const task = await tasks.create({ title, category_id, task_status });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a tasks
const deleteTasks = async (req, res) => {
    const { id } = req.params;

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such tasks" });
    }

    // find id is valid
    const task = await tasks.findOneAndDelete({ _id: id });

    if (!task) {
        return res.status(404).json({ error: "No such tasks" });
    }
    res.status(200).json(task);
};

//Update a tasks
const UpdateTasks = async (req, res) => {
    const { id } = req.params;
    const { task_status } = req.body;

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such tasks" });
    }
    //Handle the condition that updates the status to completed
    if (task_status == "completed") {
        const task = await tasks.findById(id);

        const { category_id, updatedAt } = task.toJSON();
        const check_date = new Date(updatedAt.toISOString());

        const task_categories = await tasks.find({
            task_status: { $ne: "completed" },
            category_id: category_id.toString(),
            updatedAt: { $lte: check_date },
        });

        if (task_categories.length > 1) {
            return res
                .status(400)
                .json({
                    error:
                        "Unable to update this task,\n Please complete the previous tasks that are under this category.\n Then try again",
                });
        }
    }

    // find id is valid
    const task = await tasks.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!task) {
        return res.status(404).json({ error: "No such tasks" });
    }
    res.status(200).json(task);
};

module.exports = {
    createTasks,
    getTasks,
    getSingleTasks,
    deleteTasks,
    UpdateTasks,
};
