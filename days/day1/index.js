'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function getAddition(c) {
    var addition = 0;
    switch (c) {
        case '(':
            addition = 1;
            break;
        case ')':
            addition = -1;
            break;
        default:
            throw 'Invalid char';
    }
    return addition;
}

function part1(input) {
    return input.split('').reduce((p, c) => getAddition(c) + p, 0);
}

function part2(input) {
    let p = 0;
    return input.split('').findIndex(c => {
            p += getAddition(c);
            return p < 0;
        }) + 1;
}

/* Examples part 1 */
expect(part1('(())')).toBe(0);
expect(part1('()()')).toBe(0);
expect(part1('(((')).toBe(3);
expect(part1('(()(()(')).toBe(3);
expect(part1('))(((((')).toBe(3);
expect(part1('())')).toBe(-1);
expect(part1('))(')).toBe(-1);
expect(part1(')))')).toBe(-3);
expect(part1(')())())')).toBe(-3);

/* From input */
let inputForPart1 = readFileSync('./days/day1/input.txt', 'utf8');
console.log('Part 1: ' + part1(inputForPart1));

/* Examples part 2 */
expect(part2(')')).toBe(1);
expect(part2('()())')).toBe(5);

let inputForPart2 = readFileSync('./days/day1/input.txt', 'utf8');
console.log('Part 2: ' + part2(inputForPart2));

