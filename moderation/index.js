const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//app.get

app.post('/events', async (req, res) => {
    //const {type, data} = req.body;
    const event = req.body;
    const type = event.type;

    const data = event.data; // diese wird geändert!

    // {
    //   type: 'DepartmentCreated',
    //   data: {
    //            id: 1,
    //            name: 'Müll'
    //         }
    // }

    const name = data.name;

    if (type === 'DepartmentCreated') {
        if (name.includes('Corona')) {
            data.name = 'Müll';

            const type = 'DepartmentModerated';
            await axios.post('http://localhost:4005/events', { type, data });
        }
    }

    res.send({});
});

app.listen(4002, () => {
    console.log("Listening on 4002");
});