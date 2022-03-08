import UnicornHatHD from 'unicornhat-hd';
const unicornHat = new UnicornHatHD(process.env.UNICORN_ADDRESS);

export const printHatInfo = () => {
    console.log(unicornHat);
};

export const setPixel = (x, y, {r,g,b}) => {
    unicornHat.setPixel(x, y, r, g, b);
    unicornHat.show();
};

export const clearAll = () => {
    unicornHat.clear();
    unicornHat.show();
};

clearAll();
unicornHat.setBrightness(0.4);
