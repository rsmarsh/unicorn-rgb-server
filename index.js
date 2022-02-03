import './src/env.js';
import * as path from 'path';
import express from 'express';
import { randomColour, randomPixel } from './src/utils.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(express.static('public'));


});

server.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});

printHatInfo();