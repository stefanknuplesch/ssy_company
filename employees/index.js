const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const employees = [];

app.get("/employees", (req, res) => {
    const byDepartmentId = req.query['departmentId'];
    // z.B.../employees?departmentId=3
    if (byDepartmentId !== undefined) {
        const empByDept = employees.filter(e => e.deptId === byDepartmentId);
        res.send(empByDept);
    }
    else {
        res.send(employees);
    }
});

app.post("/employees", async (req, res) => {
    const data = req.body;
    const { id, firstName, lastName, deptId } = data;

    employees.push({ id, firstName, lastName, deptId, activated: false });

    const type = 'EmployeeCreated';
    await axios.post("http://localhost:4005/events", { type, data });

    res.status(201).send({ status: "OK" });
});

app.post("/events", async (req, res) => {
    const event = req.body;

    await handleEvent(event);

    res.status(201).send({ status: "OK" });
});

app.listen(4002, () => {
    axios.get("http://localhost:4005/events").then(res => {
        const events = res.data;
        for (const event of events) {
            handleEvent(event);
        }
    }, err => {console.log(err.message)});
    console.log("Listening on 4002");
});

async function handleEvent(e) {
    const {type, data} = e;
    if (type === 'EmployeeActivated') {
        const emp = data;
        const idx = employees.findIndex(e => e.id === emp.id);
        employees[idx] = emp;

        await axios.post("http://localhost:4005/events", {type: 'EmployeeUpdated', data: employees[idx]});
    }
}
