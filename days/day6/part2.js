const expect = require('expect.js');
const fs = require('fs-promise');

const rotate = (a) => {
    // transpose from http://www.codesuck.com/2012/02/transpose-javascript-array-in-one-line.html
    const b = Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
    // row reverse
    for (i in b) {
        b[i] = b[i].reverse();
    }
    return b;
};


const solve = str => {
    const data = str
        .toString()
        .trim()
        .split("\n")
        .map(line => line.split(''));

    const rotated = rotate(data);

    return rotated.reduce((p, c) => {
        return p + c.sort((a, b) => c.filter(v => v === b).length - c.filter(v => v === a).length).pop();
    }, '');
};

expect(solve(`
eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`)).to.be('advent');

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    }
);

