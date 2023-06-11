'use strict';
const bodyParser = require('body-parser');
const express = require('express');

const PORT = process.env.PORT || 8000;

let serverData = [];

const app = express();
app.use(bodyParser.json(), (req, _, next) => {
    console.log('Time: ', Date.now());
    console.log(req.body);
    next();
});

app.get('/', (req, res) => res.send('Hello World! (HTTP GET)'));

const apiV1Router = express.Router();
app.use('/api/v1/server_data', apiV1Router);

apiV1Router.get('/', (req, res) => {
    res.send(serverData);
});
apiV1Router.get('/:id', (req, res) => {
    const { id } = req.params;
    const filteredData = serverData.filter(obj => obj.userId === id);
    res.send(filteredData);
});
apiV1Router.post('/', (req, res) => {
    const newData = req.body;
    if (newData && newData.userId) {
        serverData.push(newData);
        res.status(200).send('success');
    } else {
        res.status(400).send('invalid data: ' + JSON.stringify(newData));
    }
});
apiV1Router.delete('/:id', (req, res) => {
    const { id } = req.params;
    serverData = serverData.filter(obj => obj.userId !== id);
    res.send(`${id} has been deleted`);
})

app.listen(PORT, () => {
    console.log(`ポート${PORT}番でExpressサーバーを実行中です…`);
});
