const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    task_status: {
        type: String,
        default: 'on-going'
    }

}, { timestamps: true }
);


module.exports = mongoose.model("task", taskSchema);