const expect = require('expect.js');
const md5 = require('md5');

const solve = input => {
    let result = '';
    let i = 0;
    while (result.length < 8) {
        const hash = md5(input + i);
        if (hash.substr(0, 5) === '00000') {
            result += hash.substr(5, 1);
        }
        i++;
    }

    return result;
};

expect(solve('abc')).to.be('18f47a30');

console.log(solve('cxdnnyjw'));