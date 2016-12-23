const expect = require('expect.js');
const fs = require('fs-promise');

const makeGrid = (width, height) => {
    const grid = [];
    for (let h = 0; h < height; h++) {
        const row = [];
        for (let w = 0; w < width; w++) {
            row.push(' ');
        }
        grid.push(row);
    }

    return grid;
};

const draw = grid => {
    let output = '';
    grid.forEach(row => {
        row.forEach(column => {
            output += column;
        });
        output += "\n";
    });

    return output;
};

const applyRect = (grid, instruction) => {
    const [, area] = instruction;
    const [widthStr, heightStr] = area.split('x');

    const width = parseInt(widthStr);
    const height = parseInt(heightStr);

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            grid[h][w] = '#';
        }
    }

    return grid;
};

const rotateColumn = (grid, instruction) => {
    const [, , columnInstruction, , amountStr] = instruction;
    const [, columnStr] = columnInstruction.split('=');

    const amount = parseInt(amountStr);
    const column = parseInt(columnStr);

    for (let i = 0; i < amount; i++) {
        const valuesInColumn = [...grid.map(row => row[column])];
        for (let y = 0; y < grid.length; y++) {
            if (y - 1 < 0) {
                grid[y][column] = valuesInColumn[grid.length - 1];
            } else {
                grid[y][column] = valuesInColumn[y - 1];
            }
        }
    }

    return grid;
};

const rotateRow = (grid, instruction) => {
    const [, , rowInstruction, , amountStr] = instruction;
    const [, rowStr] = rowInstruction.split('=');

    const amount = parseInt(amountStr);
    const row = parseInt(rowStr);

    for (let i = 0; i < amount; i++) {
        const valuesInColumn = [...grid[row]];
        for (let x = 0; x < grid[0].length; x++) {
            if (x - 1 < 0) {
                grid[row][x] = valuesInColumn[grid[0].length - 1];
            } else {
                grid[row][x] = valuesInColumn[x - 1];
            }
        }
    }

    return grid;
};

const applyInstruction = (grid, instruction) => {
    switch (instruction[0]) {
        case 'rect':
            return applyRect(grid, instruction);
        case 'rotate':
            switch (instruction[1]) {
                case 'column':
                    return rotateColumn(grid, instruction);
                case 'row':
                    return rotateRow(grid, instruction);
                default:
                    throw new Error('Unknown rotation: ' + instruction[1])
            }
        default:
            throw new Error('Unknown instruction: ' + instruction[0])
    }
};

const solve = (instructions, grid) => {
    return instructions
        .toString()
        .trim()
        .split("\n")
        .reduce((p, c) => applyInstruction(p, c.split(' ')), grid);
};

let result = solve('rect 3x2', makeGrid(7, 3));
console.log(draw(result));

result = solve('rotate column x=1 by 1', result);
console.log(draw(result));

result = solve('rotate row y=0 by 4', result);
console.log(draw(result));

fs.readFile('input.txt').then(
    data => {
        console.log(draw(solve(data, makeGrid(50, 6))));
    }
);

