class WSClient {
    constructor(url, messageHandler) {
        if (!url) {
            console.error("WS Server URL must be provided");
        }

        if (!messageHandler) {
            console.warn('websocket handler callback function not provided');
            this.messageHandler = () => { };
        }
        this.messageHandler = messageHandler;

        const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
        const echoSocketUrl = socketProtocol + '//' + window.location.hostname + url;

        this.wsConnection = this.#createConnection(echoSocketUrl);
        this.wsConnection.onopen = () => console.log("server open");
        this.wsConnection.onmessage = (evt) => this.#receive(evt.data);
        this.wsConnection.onerror = this.#wsError
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
        console.log("created WebSocket connection");
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

    #wsError(error) {
        console.log("ws error: ", error);
    };
};


export default WSClient;