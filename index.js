import './src/env.js';
import express from 'express';
import expressWs from 'express-ws';
import { setPixel, clearAll } from './src/unicorn.js';
import { rgbToHex } from './src/utils.js';

let pixelsChanged = 0;
const pixelStates = {};

// Updates the state of the pixel array after each change
const updateState = (x, y, { r, g, b }) => {
    if (!pixelStates[x]) {
        pixelStates[x] = {}
    }

    const hex = rgbToHex(r, g, b);
    pixelStates[x][y] = hex;
};

const triggerPixelChange = (x, y, { r, g, b }) => {
    updateState(x, y, { r, g, b });
    setPixel(x, y, { r, g, b });
}

const server = express();
expressWs(server);

server.use(express.static('public'));

const wsRouter = express.Router();

wsRouter.ws('/echo', (ws, res) => {
    ws.send(JSON.stringify(pixelStates));
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        if (data.label === 'cellchange') {
            triggerPixelChange(data.payload.x, data.payload.y, { r: data.payload.r, g: data.payload.g, b: data.payload.b });
        } else {
            console.log("unrecognised message label:", data.label);
        }
    })
});

server.use("/ws/", wsRouter);




server.get('/pixel/clear', (req, res) => {
    res.send('cleared');
    pixelStates = {};
    clearAll();
})

server.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});