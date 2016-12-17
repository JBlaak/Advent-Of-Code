const expect = require('expect.js');
const fs = require('fs-promise');

const grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const applyOperation = function (c, p) {
    switch (c) {
        case 'U':
            p.y--;
            break;
        case 'R':
            p.x++;
            break;
        case 'D':
            p.y++;
            break;
        case 'L':
            p.x--;
            break;
    }
};

const bound = function (p) {
    if (p.x > 2) p.x = 2;
    if (p.x < 0) p.x = 0;
    if (p.y > 2) p.y = 2;
    if (p.y < 0) p.y = 0;
};

const solve = (str) => {
    let coordinate = {x: 1, y: 1};
    return str.toString().trim().split("\n").reduce((code, line) => {
        coordinate = line.split('').reduce((p, c) => {
            applyOperation(c, p);
            bound(p);

            return p;
        }, coordinate);

        return code + grid[coordinate.y][coordinate.x];
    }, '');
};

expect(solve(`ULL
RRDDD
LURDL
UUUUD`)).to.be('1985');

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    },
    console.error
);

