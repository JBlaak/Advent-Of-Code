'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

// This can be done with one big if statement instead on three filters
// but no human being could read that
function weNeedzInterz(input) {
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

/* Examples */
expect(weNeedzInterz('ugknbfddgicrmopn')).toBe(1);
expect(weNeedzInterz('aaa')).toBe(1);
expect(weNeedzInterz('jchzalrnumimnmhp')).toBe(0);
expect(weNeedzInterz('haegwjzuvuyypxyu')).toBe(0);
expect(weNeedzInterz('dvszwmarrgswjxmb')).toBe(0);

/* From input */
let input = readFileSync('./days/day5/input.txt', 'utf8');
console.log(weNeedzInterz(input));

