const expect = require('expect.js');
const fs = require('fs-promise');

const solve = str => {
    return str.toString().trim().split("\n").reduce((p, line) => {
        const sorted = line
            .split(' ')
            .filter(v => v.trim() !== '')
            .map(v => parseInt(v))
            .sort((a, b) => a - b);
        
        return sorted[2] >= (sorted[0] + sorted[1]) ? p : p + 1
    }, 0);
};

expect(solve('   5   8   7')).to.be(1);
expect(solve('   5   8  17')).to.be(0);
expect(solve(`   5   8  17
   823  909    9
   823  821    9`)).to.be(1);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    },
    console.error
);

