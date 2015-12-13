'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function part1(input) {
    return input.split("\n").reduce((p, c) => {
        let [l, w, h] = c.split('x').map(v => parseInt(v));

        let sides = [l * w, w * h, h * l];

        return p + sides.reduce((sp, sc) => sp + 2 * sc, 0) + Math.min.apply(null, sides);
    }, 0);
}

function part2(input) {
    return input.split("\n").reduce((p, c) => {
        let dimensions = c.split('x').map(v => parseInt(v));
        let [l, w, h] = dimensions;

        let ribbon = 2 * Math.min.apply(null, [l + w, w + h, l + h]);
        let bow = dimensions.reduce((bp, bc) => !bp ? bc : bp * bc);

        return p + ribbon + bow;
    }, 0);
}

/* Examples part 1 */
expect(part1('2x3x4')).toBe(58);
expect(part1('1x1x10')).toBe(43);

/* From input */
let inputForPart1 = readFileSync('./days/day2/input.txt', 'utf8');
console.log('Part 1: ' + part1(inputForPart1));

/* Examples part 2 */
expect(part2('2x3x4')).toBe(34);
expect(part2('1x1x10')).toBe(14);

/* From input */
let inputForPart2 = readFileSync('./days/day2/input.txt', 'utf8');
console.log('Part 2: ' + part2(inputForPart2));
