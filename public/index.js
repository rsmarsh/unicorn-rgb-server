import WSClient from './websocket-client.js';
import Controller from './controller.js';
const serverStatus = document.querySelector('.status');

const wsReceived = (msg) => {
    switch (msg.label) {
        case 'grid-state':
            controller.generateGrid(msg.payload);
            break;
        case 'external-cell-change':
            const cell = controller.getCell(msg.payload.x, msg.payload.y);
            controller.applyCellColour(cell, msg.payload.hex)
            break;
    }
}
const ws = new WSClient('/ws', {
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