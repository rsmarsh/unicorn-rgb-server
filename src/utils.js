export const randomPixel = () => Math.floor(Math.random() * 16);

export const randomColour = () => Math.floor(Math.random() * 255);

export const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);