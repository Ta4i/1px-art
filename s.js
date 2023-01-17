const Jimp = require("jimp");
const pngitxt = require('png-itxt');
const fs = require('fs');


const color = Number('0x' + process.argv[2]);
const FILENAME = 'test.png';

new Jimp(
    1, 1,
    color, (err, image) => {
        image.write(FILENAME, (e) => {
            fs.createReadStream(FILENAME)
                .pipe(pngitxt.set({ keyword: 'description', value: process.argv[3] }))
                .pipe(fs.createWriteStream('output' + FILENAME))
        });
    }
)
