const expect = require('expect.js');
const fs = require('fs-promise');

const grid = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null],
];

const applyOperation = function (operation, oldCoordinate) {
    const newCoordinate = Object.assign({}, oldCoordinate);
    switch (operation) {
        case 'U':
            newCoordinate.y--;
            break;
        case 'R':
            newCoordinate.x++;
            break;
        case 'D':
            newCoordinate.y++;
            break;
        case 'L':
            newCoordinate.x--;
            break;
    }

    return newCoordinate;
};

const isAllowedCoordinate = function (coordinate) {
    return grid[coordinate.y]
        && grid[coordinate.y][coordinate.x]
        && grid[coordinate.y][coordinate.x] !== null;
};

const solve = (str) => {
    let coordinate = {x: 0, y: 2};
    return str.toString().trim().split("\n").reduce((code, line) => {
        coordinate = line.split('').reduce((oldCoordinate, operation) => {
            const newCoordinate = applyOperation(operation, oldCoordinate);

            return isAllowedCoordinate(newCoordinate) ? newCoordinate : oldCoordinate;
        }, coordinate);

        return code + grid[coordinate.y][coordinate.x];
    }, '');
};

expect(solve(`ULL
RRDDD
LURDL
UUUUD`)).to.be('5DB3');

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    },
    console.error
);

