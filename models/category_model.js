const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    no_of_tasks: {
        type: Number,
        required: true
    }
}, { timestamps: true }
);


module.exports = mongoose.model("category", categorySchema);