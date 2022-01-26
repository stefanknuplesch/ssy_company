const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4001/events', event).catch(error => {console.log(error.message)});
    axios.post('http://localhost:4002/events', event).catch(error => {console.log(error.message)});

    res.send({});
});

app.listen(4005, () => {
    console.log("Listening on 4005");
});