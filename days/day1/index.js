'use strict';
const expect = require('expect.js');
const fs = require('fs-promise');

/**
 * Will rotate our vector, but only puts out integers (we don't want to think about doubles now)
 * @param vector
 * @param degrees
 * @returns {[*,*]}
 */
const rotate = (vector, degrees) => {
    return [
        Math.round(vector[0] * Math.cos(degrees * Math.PI / 180) - vector[1] * Math.sin(degrees * Math.PI / 180)),
        Math.round(vector[0] * Math.sin(degrees * Math.PI / 180) + vector[1] * Math.cos(degrees * Math.PI / 180))
    ];
};

const solve = (str) => {
    const directions = str.toString().split(', ');

    const result = directions.reduce((p, c) => {
            const blocks = parseInt(c.substring(1));
            p.direction = rotate(
                p.direction,
                c.substring(0, 1) == 'R' ? 90 : -90
            );
            p.location = {
                x: p.location.x + p.direction[0] * blocks,
                y: p.location.y + p.direction[1] * blocks
            };
            return p;
        },
        {
            direction: [0, 1],
            location: {
                x: 0,
                y: 0
            }
        }
    );

    return Math.abs(result.location.y) + Math.abs(result.location.x);
};

expect(solve('R2, L3')).to.be(5);
expect(solve('R2, R2, R2')).to.be(2);
expect(solve('R5, L5, R5, R3')).to.be(12);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    }
);

