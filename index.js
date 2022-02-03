import './env.js';
import express from 'express';
import { randomColour, randomPixel } from './src/utils.js';

const server = express();

server.get('/', (req, res) => {
    console.log('root route hit');
    res.send('success');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});

printHatInfo();