const expect = require('expect.js');
const fs = require('fs-promise');

const supports = ip => {
    let result = false;
    let inBracket = false;
    const chars = ip.split('');
    chars.forEach((char, i) => {
        if (char === '[') {
            inBracket = true;
        } else if (char === ']') {
            inBracket = false;
        } else if (
            !inBracket
            && i + 2 < chars.length
            && chars.slice(i, i + 2).join('') === chars.slice(i + 1, i + 3).reverse().join('')
            && chars[i] === chars[i + 2]
            && chars[i] !== chars[i + 1]
        ) {
            const other = chars.slice(i, i + 2).reverse().join('') + chars[i + 1];
            //TODO wut
        }
    });

    return result;
};

const solve = str => {
    return str.toString().trim().split("\n").reduce((p, c) => supports(c) ? p + 1 : p, 0);
};

expect(supports('aba[bab]xyz')).to.be(true);
expect(supports('xyx[xyx]xyx')).to.be(false);
expect(supports('aaa[kek]eke')).to.be(true);
expect(supports('zazbz[bzb]cdb')).to.be(true);
expect(supports('abab[xxx]xyz')).to.be(false);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    }
);

