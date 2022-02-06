import WSClient from './websocket-client.js';
import Controller from './controller.js';
const serverStatus = document.querySelector('.status');

const wsReceived = (msg) => console.log(msg);
const ws = new WSClient('/ws/echo', {
    message: wsReceived,
    connected: () => serverStatus.textContent = 'connected',
    error: () => serverStatus.textContent = 'error occured',
});

const cellChanged = (x, y, r, g, b) => {
    const wsDataString = ws.wrapData('cell-change', { x, y, r, g, b });
    ws.send(wsDataString);
};

const controller = new Controller(cellChanged);
controller.generateGrid();