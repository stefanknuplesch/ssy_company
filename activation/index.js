const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const employeesToActivate = [];

app.post("/events", (req, res) => {
   const event = req.body;

   handleEvent(event);

   res.send({});
});

app.get("/employees", (req, res) => {
    res.send(employeesToActivate.filter(e => !e.activated));
});

app.post('/employees/:id', async function (req, res) {
    const empId = req.params.id;

    const idx = employeesToActivate.findIndex(e => e.id === empId);
    employeesToActivate[idx].activated = true;
    const emp = employeesToActivate[idx];

    const event = {type: 'EmployeeActivated', data: emp};
    await axios.post("http://localhost:4005/events", event);

    res.send({});
});

app.listen(4004, () => {
    axios.get("http://localhost:4005/events").then(res => {
        const events = res.data;
        for (const event of events) {
            handleEvent(event);
        }
    });
    console.log("Listening on 4004");
});

function handleEvent(e) {
    const {type, data} = e;
    if (type === 'EmployeeCreated')
    {
        employeesToActivate.push(data);
    }
}
