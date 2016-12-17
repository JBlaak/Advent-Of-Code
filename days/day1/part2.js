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

    const path = directions.reduce((p, c) => {
            const blocks = parseInt(c.substring(1));
            p.direction = rotate(
                p.direction,
                c.substring(0, 1) == 'R' ? 90 : -90
            );
            const previousLocation = p.locations.length > 0
                ? p.locations[p.locations.length - 1]
                : {x: 0, y: 0};

            //We add every location we will visit to the stack
            for (let i = 1; i <= blocks; i++) {
                p.locations.push({
                    x: previousLocation.x + p.direction[0] * i,
                    y: previousLocation.y + p.direction[1] * i
                });
            }
            return p;
        },
        {
            direction: [0, 1],
            locations: []
        }
    );

    //Just look through all past location from every location till we have a double
    const result = path.locations.find((location, index) => {
        if (index === 0) return false;
        return path.locations.slice(0, index - 1).findIndex((previousLocation => {
                return previousLocation.x === location.x && previousLocation.y === location.y;
            })) !== -1;
    });

    return Math.abs(result.y) + Math.abs(result.x);
};

expect(solve('R8, R4, R4, R8')).to.be(4);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    }
);

