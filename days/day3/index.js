'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function perfectlySphericalHousesInAVacuum(input) {
    return input.split('')
        .reduce((p, c) => {
            p.push({
                x: p[p.length - 1].x + (c == '>' ? 1 : c == '<' ? -1 : 0),
                y: p[p.length - 1].y + (c == '^' ? 1 : c == 'v' ? -1 : 0)
            });
            return p;
        }, [{x: 0, y: 0}])
        .reduce((p, c) => {
            if (!p.some(i => i.x == c.x && i.y == c.y)) p.push(c);
            return p;
        }, [])
        .length;
}

/* Examples */
expect(perfectlySphericalHousesInAVacuum('>')).toBe(2);
expect(perfectlySphericalHousesInAVacuum('^>v<')).toBe(4);
expect(perfectlySphericalHousesInAVacuum('^v^v^v^v^v')).toBe(2);

/* From input */
let input = readFileSync('./days/day3/input.txt', 'utf8');
console.log(perfectlySphericalHousesInAVacuum(input));

