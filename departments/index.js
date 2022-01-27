const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const departments = [];

app.get("/departments", (req, res) => {
    res.send(departments);
});

app.post("/departments", async (req, res) => {
    const data = req.body;
    const { id, name } = data;
    departments.push({id, name});

    const type = 'DepartmentCreated';
    await axios.post("http://localhost:4005/events", { type, data });

    res.status(201).send({ status: "OK" });
});

app.post("/events", async (req, res) => {
    const event = req.body;

    res.status(201).send({ status: "OK" });
});

app.listen(4001, () => {
    console.log("Listening on 4001");
});
