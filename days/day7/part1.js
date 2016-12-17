const expect = require('expect.js');
const fs = require('fs-promise');

const supports = ip => {
    let result = false;
    const chars = ip.split('');
    let inBracket = false;
    let hasValidInBracket = false;
    chars.forEach((char, i) => {
        if (char === '[') {
            inBracket = true;
        }
        if (char === ']') {
            inBracket = false;
        }

        if (chars.slice(i, i + 2).join('') === chars.slice(i + 2, i + 4).reverse().join('') && chars[i] !== chars[i + 1]) {
            if (inBracket) {
                hasValidInBracket = true;
            } else {
                result = true;
            }
        }
    });

    return hasValidInBracket ? false : result;
};

const solve = str => {
    return str.toString().trim().split("\n").reduce((p, c) => supports(c) ? p + 1 : p, 0);
};

expect(supports('abba[mnop]qrst')).to.be(true);
expect(supports('abcd[bddb]xyyx')).to.be(false);
expect(supports('aaaa[qwer]tyui')).to.be(false);
expect(supports('ioxxoj[asdfgh]zxcvbn')).to.be(true);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    }
);

