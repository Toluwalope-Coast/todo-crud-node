const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    noOfTask: {
        type: Number,
        required: true
    }
}, { timestamps: true }
);


module.exports = mongoose.model("category", categorySchema);