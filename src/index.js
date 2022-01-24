import './env.js';

const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
    console.log('root route hit');
    res.send('success');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});
