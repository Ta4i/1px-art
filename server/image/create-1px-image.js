const Jimp = require("jimp");
const pngitxt = require('png-itxt');
const fs = require('fs');

modeule.exports = async function create1pxImage(path, color, metadata) {
    const image = await generate1pxJimpImage(color);
    const tempPath = `temp_${path}`;

    await image.writeAsync(tempPath);
    await writeMetadata(tempPath, path, metadata);
    fs.unlinkSync(tempPath);
}

async function generate1pxJimpImage(color) {
    return new Promise((resolve, reject) => {
        new Jimp(
            1, 1,
            color,
            (err, image) => {
                if (err) {
                    reject(err)
                }
                resolve(image)
            }
        )
    });
}

function writeMetadata(from, to, metadata) {
    return new Promise((resolve) => {
        let imageReadStream = fs.createReadStream(from);
        for (const keyword in metadata) {
            const prop = {
                keyword,
                value: metadata[keyword]
            };
            console.log('prop', prop);
            imageReadStream = imageReadStream.pipe(
                pngitxt.set(prop)
            )
        }
        const imageWriteStream = fs.createWriteStream(to);
        imageWriteStream.addListener('finish', () => resolve());
        imageReadStream.pipe(imageWriteStream);
    });
} 

create1pxImage('test2.png', 0x0000FFff, {lol: 'kek', chebu: 'rek\nbut what is here^@^@hahaha'});
