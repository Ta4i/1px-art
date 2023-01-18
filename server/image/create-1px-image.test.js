const create1pxImage = require('./create-1px-image');
const fs = require('fs');

describe('When create1pxImage run', () => {
    const PATH = 'test.png';
    beforeEach(async () => {
        await create1pxImage(PATH, 0xaabbccdd, { foo: 'bar' });
    });
    afterEach(() => {
        fs.unlinkSync(PATH);
    });
    test('png sould created', async () => {
        expect(fs.existsSync('test.png')).toBeTruthy();
    });
})
