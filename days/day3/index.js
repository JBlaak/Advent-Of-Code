'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function part1(input) {
    return input.split('')
        .reduceToCoordinates()
        .toUniqueCoordinates()
        .length;
}

function part2(input) {
    let moves = input.split('');
    let santa = moves.filter((v, i) => i % 2 == 0).reduceToCoordinates();
    let robo = moves.filter((v, i) => i % 2 != 0).reduceToCoordinates();

    return [...santa, ...robo].toUniqueCoordinates().length;
}

Array.prototype.toUniqueCoordinates = function () {
    return this.reduce((p, c) => {
        if (!p.some(i => i.x == c.x && i.y == c.y)) p.push(c);
        return p;
    }, [])
};

Array.prototype.reduceToCoordinates = function () {
    return this.reduce((p, c) => {
        p.push({
            x: p[p.length - 1].x + (c == '>' ? 1 : c == '<' ? -1 : 0),
            y: p[p.length - 1].y + (c == '^' ? 1 : c == 'v' ? -1 : 0)
        });
        return p;
    }, [{x: 0, y: 0}]);
};

/* Examples part 1 */
expect(part1('>')).toBe(2);
expect(part1('^>v<')).toBe(4);
expect(part1('^v^v^v^v^v')).toBe(2);

/* From input */
let inputForPart1 = readFileSync('./days/day3/input.txt', 'utf8');
console.log('Part 1: ' + part1(inputForPart1));

/* Examples part 2 */
expect(part2('^v')).toBe(3);
expect(part2('^>v<')).toBe(3);
expect(part2('^v^v^v^v^v')).toBe(11);

/* From input */
let inputForPart2 = readFileSync('./days/day3/input.txt', 'utf8');
console.log('Part 2: ' + part2(inputForPart2));
