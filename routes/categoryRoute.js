const express = require("express");
const {
    createCategory,
    getCategory,
    getSingleCategory,
    deleteCategory,
    UpdateCategory
} = require("../controllers/categoryController");
const routerCategory = express.Router();

//Get all Category
routerCategory.get('/', getCategory);

//Get a single Category
routerCategory.get('/:id', getSingleCategory);

//Post a new Category
routerCategory.post('/', createCategory);

//Delete a Category
routerCategory.delete('/:id', deleteCategory);

//Update a Category
routerCategory.patch('/:id', UpdateCategory);

module.exports = routerCategory;