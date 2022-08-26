const express = require("express");
const env = require("dotenv").config();
const categoryRouter = require("./routes/categoryRoute");
const taskRouter = require("./routes/taskRoute");
const mongoose = require("mongoose");

// invoking express
const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
}
)

//All routes
app.use('/api/category', categoryRouter);
app.use('/api/task', taskRouter);



//connect to mongo database

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to database");
        // Listening for request 
        app.listen(process.env.PORT, () => {
            console.log(`listening @ port ${process.env.PORT}`);
        });

    })
    .catch(err => {
        console.log(`error connecting to database: ${err}`);
    })
