const expect = require('expect.js');
const fs = require('fs-promise');

const rotate = (char, n) => {
    let code = char.charCodeAt(0);
    for (let i = 0; i < n; i++) {
        code++;
        if (code > "z".charCodeAt(0)) {
            code = "a".charCodeAt(0);
        }
    }

    return String.fromCharCode(code);
};

const findSectorIdByName = (str, name) => {
    let result = '';
    str
        .toString()
        .trim()
        .split("\n")
        .forEach(line => {
            const [, sectorId] = line.split('-').pop().match(/(.*)\[(.*)\]/);
            const decrypted = line
                .split('-')
                .slice(0, -1)
                .join(' ')
                .split('')
                .map(char => char !== ' ' ? rotate(char, parseInt(sectorId)) : char)
                .join('');

            if (decrypted === name) {
                result = sectorId;
            }
        });

    return result;
};

expect(findSectorIdByName('qzmt-zixmtkozy-ivhz-343[asdfx]', 'very encrypted name')).to.be('343');

fs.readFile('input.txt').then(
    data => {
        console.log(findSectorIdByName(data, 'northpole object storage'));
    },
    console.error
);

