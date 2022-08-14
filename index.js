import './src/env.js';
import { setPixel, clearAll } from './src/unicorn.js';
import express from 'express';

const triggerPixelChange = (x, y, { r, g, b }) => {
    setPixel(x, y, { r, g, b });
}

const server = express();

server.get('/pixel/clear', (req, res) => {
    clearAll();
    res.sendStatus(200)
});

server.get('/pixel/set/:x/:y/:r/:g/:b', (req, res) => {
    const { x, y, r, g, b } = req.params;
    triggerPixelChange(x, y, { r, g, b });
    res.sendStatus(200);
});

server.get('/', (req, res) => res.sendStatus(404));

const PORT = process?.env?.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Unicorn server up on port ${PORT} and ready for requests`);
});
