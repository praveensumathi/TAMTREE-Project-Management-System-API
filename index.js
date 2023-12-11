const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

const employeeRoutes = require("./routes/Employee");
const projectRoutes = require("./routes/Project");
const storyRoutes = require("./routes/story");
const taskRouter = require("./routes/Task");

mongoose
    .connect(
        "mongodb+srv://pmboobesh:a5pIqiYiNwRwnGUB@cluster0.hbtw8lt.mongodb.net/ProjectManagement"
    )
    .then(() => {
        console.log("Mongoose Connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());
app.use(cors())

app.use('/projects', projectRoutes);
app.use('/stories', storyRoutes);
app.use('/employee', employeeRoutes);
app.use("/task", taskRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.json(err);

  next();
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log("Server has started on port " + port);
  }
});
