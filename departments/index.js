const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const departments = [];

app.get('/departments', (req, res) => {
    res.send(departments);
});

app.post('/departments', async (req, res) => {
    const department = req.body;
    departments.push(department);

    const type = 'DepartmentCreated';
    const data = department;

    await axios.post('http://localhost:4005/events', { type, data });

    res.send({});
});

app.post('/events', (req, res) => {
   const {type, data} = req.body;

   if (type === 'DepartmentModerated')
   {
       const {id, name} = data;
       const index = departments.findIndex(dep => data.id === dep.id);
       departments[index].name = data.name;
   }

   res.send({});
});

app.listen(4001, () => {
    console.log("Listening to 4001..");
});