const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const port = 3000
const app = express();


mongoose.connect('mongodb+srv://pmboobesh:a5pIqiYiNwRwnGUB@cluster0.hbtw8lt.mongodb.net/ProjectManagement')
    .then(() => {
        console.log('Mongoose Connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

const employeeRoutes = require("./routes/Employee")

app.use((err, req, res, next) => {
    console.log("global error handling running");
    res.json(err)
    next()
})

app.use("/employee", employeeRoutes)


app.listen(port, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log("Server has started on port " + port);
    }
});