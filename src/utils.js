export const randomPixel = () => Math.floor(Math.random() * 16);

export const randomColour = () => Math.floor(Math.random() * 255);

export const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// Converts a JS object into a label/data ready to be sent via web socket
export const wrapDataForWs = (label, data) => {
    return JSON.stringify({
        label: label,
        payload: data
    });
}