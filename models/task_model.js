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
    task_status: {
        type: String,
        required: true
    }
}, { timestamps: true }
);


module.exports = mongoose.model("task", taskSchema);