import WSClient from './websocket-client.js';
import Controller from './controller.js';


const wsReceived = (msg) => console.log(msg);
const ws = new WSClient('/ws/echo', wsReceived);

const cellChanged = (x, y, r, g, b) => {
    const wsDataString = ws.wrapData('cellchange', { x, y, r, g, b });
    ws.send(wsDataString);
};

const controller = new Controller(cellChanged);
controller.generateGrid();