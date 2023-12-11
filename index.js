const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const port = 3000


mongoose.connect('mongodb://localhost:27017/local')
    .then(() => {
        console.log('Mongoose Connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
const app = express();


app.use((err, req, res, next) => {
    console.log("global error handling running");
    res.json(err)
    next()
})

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log("Server has started on port " + port);
    }
});