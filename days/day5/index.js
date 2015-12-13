'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

// This can be done with one big if statement instead on three filters
// but no human being could read that
function part1(input) {
    return input.split("\n")
        .map(s => s.split(''))
        // Vowels
        .filter(s => 3 <= s.filter(c => ['a', 'e', 'i', 'o', 'u'].indexOf(c) != -1).length)
        // Letter twice in a row
        .filter(s => s.some((c, i, a) => i > 0 && a[i - 1] == c))
        // Naughty combies
        .filter(s => !s.some((c, i, a) => i > 0 && ['ab', 'cd', 'pq', 'xy'].indexOf(a[i - 1] + c) != -1))
        .length
}

function part2(input) {
    return input.split("\n")
        .map(s => s.split(''))
        //Repeating combies
        .filter((chars) => chars.some((v, i, a) => {
            let combi = v + a[i + 1];
            return a.slice(i + 2).some((v, i, a) => v + a[i + 1] == combi);
        }))
        //Repeating
        .filter(chars => chars.some((v, i, a) => v == a[i + 2]))
        .length;
}

/* Examples part 1 */
expect(part1('ugknbfddgicrmopn')).toBe(1);
expect(part1('aaa')).toBe(1);
expect(part1('jchzalrnumimnmhp')).toBe(0);
expect(part1('haegwjzuvuyypxyu')).toBe(0);
expect(part1('dvszwmarrgswjxmb')).toBe(0);

/* From input */
let inputForPart1 = readFileSync('./days/day5/input.txt', 'utf8');
console.log('Part 1: ' + part1(inputForPart1));

/* Examples part 2 */
expect(part2('qjhvhtzxzqqjkmpb')).toBe(1);
expect(part2('xxyxx')).toBe(1);
expect(part2('aaa')).toBe(0);
expect(part2('uurcxstgmygtbstg')).toBe(0);
expect(part2('ieodomkazucvgmuy')).toBe(0);

/* From input */
let inputForPart2 = readFileSync('./days/day5/input.txt', 'utf8');
console.log('Part 2: ' + part2(inputForPart2));

