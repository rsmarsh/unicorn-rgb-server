import UnicornHatHD from 'unicornhat-hd';
const unicornHat = new UnicornHatHD(process.env.UNICORN_ADDRESS);

export const printHatInfo = () => {
    console.log(unicornHat);
};
