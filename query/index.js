const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const departments = [];
const employees = [];

app.get("/overview", (req, res) => {
    const overview = [];
    /*
    Client erwartet folgende Struktur (Array von departments mit Inhalt: name + array von employees mit Inhalt: name):
    [
        {
            name: "Management"
            employees: [
                            { name: "Herr Max" },
                            { name: "Frau Karl" }
                       ]
        },
        {
            name: "HR"
            employees: [
                            { name: "Max Mustermann" },
                            { name: "Martina Musterfrau" }
                       ]
        }
    ]
    */

    // kann man mit mehr Zeit besser lösen :-)
    for (const d of departments) {
        const empArray = [];
        for (const e of employees) {
            if (e.deptId === d.id && e.activated === true)
            {
                empArray.push({ name: e.firstName + ' ' + e.lastName});
            }
        }
        overview.push({ name: d.name , employees: empArray });
    }
    res.send(overview);
});

app.post("/events", (req, res) => {
    const event = req.body;

    handleEvent(event);

    res.send({status: "OK"});
})

app.listen(4003, () => {
    axios.get("http://localhost:4005/events").then(res => {
        const events = res.data;
        for (const event of events) {
            handleEvent(event);
        }
    }, err => {console.log(err.message)});
    console.log("Listening on 4003");
});

function handleEvent(e) {
    const { type, data } = e;

    if (type === 'DepartmentCreated')
    {
        departments.push(data);
    }
    if (type === 'EmployeeCreated')
    {
        employees.push(data);
    }
    if (type === 'EmployeeUpdated')
    {
        const emp = data;
        const idx = employees.findIndex(e => e.id === emp.id);
        employees[idx] = emp;
    }
}
