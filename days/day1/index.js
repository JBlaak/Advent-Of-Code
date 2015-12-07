'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function notQuiteLisp(input) {
    return input.split('').reduce((p, c) => {
        switch (c) {
            case '(':
                return p + 1;
                break;
            case ')':
                return p - 1;
                break;
            default:
                throw 'Invalid char';
        }
    }, 0);
}

/* Examples */
expect(notQuiteLisp('(())')).toBe(0);
expect(notQuiteLisp('()()')).toBe(0);
expect(notQuiteLisp('(((')).toBe(3);
expect(notQuiteLisp('(()(()(')).toBe(3);
expect(notQuiteLisp('))(((((')).toBe(3);
expect(notQuiteLisp('())')).toBe(-1);
expect(notQuiteLisp('))(')).toBe(-1);
expect(notQuiteLisp(')))')).toBe(-3);
expect(notQuiteLisp(')())())')).toBe(-3);

/* From input */
let input = readFileSync('./days/day1/input.txt', 'utf8');
console.log(notQuiteLisp(input));

