'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

function wasToldThereWouldBeNoMath(input) {
    return input.split("\n").reduce((p, c) => {
        let [l, w, h] = c.split('x');

        let sides = [l * w, w * h, h * l];

        return p + sides.reduce((sp, sc) => sp + 2 * sc, 0) + Math.min.apply(null, sides);
    }, 0);
}

/* Examples */
expect(wasToldThereWouldBeNoMath('2x3x4')).toBe(58);
expect(wasToldThereWouldBeNoMath('1x1x10')).toBe(43);

/* From input */
let input = readFileSync('./days/day2/input.txt', 'utf8');
console.log(wasToldThereWouldBeNoMath(input));



