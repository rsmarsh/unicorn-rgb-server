import './src/env.js';
import * as path from 'path';
import express from 'express';
import { setPixel, clearAll } from './src/unicorn.js';
import { randomColour, randomPixel } from './src/utils.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pixelsChanged = 0;

const server = express();

server.use(express.static('public'));


server.get('/pixel/set/:x/:y/:r/:g/:b', (req, res) => {
    const x = req.params.x;
    const y = req.params.y;
    const r = req.params.r;
    const g = req.params.g;
    const b = req.params.b;

    setPixel(x, y, { 
        r: r,
        g: g,
        b: b
    });

    res.send('changed '+(++pixelsChanged));
});
server.get('/pixel/random', (req, res) => {
    setPixel(
        randomPixel(),
        randomPixel(), 
        { 
            r: randomColour(),
            g: randomColour(),
            b: randomColour()
        });
    res.send('changed '+(++pixelsChanged));
});

server.get('/pixel/clear', (req,res) => {
    res.send('cleared');
    clearAll();
})

server.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});