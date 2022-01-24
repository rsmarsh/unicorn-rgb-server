const express = require('express');

const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
    console.log('root route hit');
    res.send('success');
});

server.listen(PORT, () => {
    console.log('server up and running');
});
