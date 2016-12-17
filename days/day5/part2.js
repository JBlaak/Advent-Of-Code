const expect = require('expect.js');
const md5 = require('md5');

const solve = input => {
    let result = '________'.split('');
    let i = 0;

    do {
        const hash = md5(input + i);
        if (hash.substr(0, 5) === '00000') {
            let position = parseInt(hash.substr(5, 1));
            if (position < 8 && result[position] === '_') {
                result[position] = hash.substr(6, 1);
                console.log(result.join(''));
            }
        }
        i++;
    } while (result.filter(v => v !== '_').length < 8);

    return result.join('');
};

// expect(solve('abc')).to.be('05ace8e3');

console.log(solve('cxdnnyjw'));