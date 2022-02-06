class WSClient {
    constructor(url, handlers) {
        if (!url) {
            console.error("WS Server URL must be provided");
        }

        if (!handlers.message) {
            console.warn('websocket handler callback function not provided');
            this.messageHandler = () => { };
        }

        this.messageHandler = handlers.message;

        const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
        const echoSocketUrl = socketProtocol + '//' + window.location.hostname + url;

        this.wsConnection = this.#createConnection(echoSocketUrl);
        this.wsConnection.onopen = () => handlers?.connected();
        this.wsConnection.onerror = (err) => handlers?.error(err);
        this.wsConnection.onmessage = (evt) => this.#receive(evt.data);
    };

    // Converts a JS object into a label/data ready to be sent via web socket
    wrapData(label, data) {
        const wrapped = {
            label: label,
            payload: data
        };

        return JSON.stringify(wrapped);
    };

    #createConnection(url) {
        const wsConnection = new WebSocket(url);
        return wsConnection;
    };

    send(msg) {
        this.wsConnection.send(msg);
    };

    #receive(data) {
        let dataFromServer;
        try {
            dataFromServer = JSON.parse(data);
        } catch {
            // message may be a standard string
            dataFromServer = data;
        }

        this.messageHandler(dataFromServer);
    };
};


export default WSClient;