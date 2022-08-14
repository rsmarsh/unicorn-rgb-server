import './src/env.js';
import http from 'http';
// import { setPixel, clearAll } from './src/unicorn.js';
import { rgbToHex, wrapDataForWs } from './src/utils.js';

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
    setPixel(x, y, { r, g, b });
}

const server = http.createServer();

server.get('/', (req, res) => {
    console.log("request received at root ")
});

server.get('/pixel/clear', (req, res) => {
    res.send('cleared');
    pixelStates = {};
    clearAll();
});

server.get('/pixel/:x/:y/:r/:g/:b', (req, res) => {
    const { x, y, r, g, b } = req.params;
    // triggerPixelChange(x, y, { r, g, b });
    console.log("get request received")
    res.send('set');
})


server.listen(process.env.PORT || 3000, () => {
    console.log(`Unicorn server up on port ${process.env.URLS} and ready for requests`);
});
