const { default: mongoose } = require("mongoose");
const category = require("../models/category_model");


//Get all category
const getCategory = async (req, res) => {
    const categories = await category.find({}).sort({ createdAt: -1 });
    console.log("this is without id")

    res.status(200).json(categories)
}
//Get a single category
const getSingleCategory = async (req, res) => {
    const { id } = req.params
    console.log(`This is the id`)

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' })
    }

    // find id is valid
    const categories = await category.findById(id)

    if (!categories) {
        return res.status(404).json({ error: 'No such category' })
    }
    res.status(200).json(categories)
}

//Create a new category

const createCategory = async (req, res) => {
    //extracting the data from the request
    const { name, no_of_tasks, } = req.body;

    //Add document to db
    try {

        const categories = await category.create({ name, no_of_tasks });
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' })
    }

    // find id is valid
    const categories = await category.findOneAndDelete({ _id: id })

    if (!categories) {
        return res.status(404).json({ error: 'No such category' })
    }
    res.status(200).json(categories)

}


//Update a category
const UpdateCategory = async (req, res) => {
    const { id } = req.params

    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' })
    }

    // find id is valid
    const categories = await category.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!categories) {
        return res.status(404).json({ error: 'No such category' })
    }
    res.status(200).json(categories)
}

module.exports = {
    createCategory,
    getCategory,
    getSingleCategory,
    deleteCategory,
    UpdateCategory
}