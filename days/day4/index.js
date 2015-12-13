'use strict';
import expect from 'expect';
import crypto from 'crypto';
import {readFileSync} from 'fs';

function exercise(input, prefix) {
    let value = -1;
    do
        value++;
    while (!crypto.createHash('md5').update(input + String(value)).digest("hex").startsWith(prefix));
    return value;
}

/* Examples part 1 */
expect(exercise('abcdef', '00000')).toBe(609043);
expect(exercise('pqrstuv', '00000')).toBe(1048970);

/* From input part 1 */
console.log('Part 1: ' + exercise('yzbqklnj', '00000'));

/* From input part 2 */
console.log('Part 2: ' + exercise('yzbqklnj', '000000'));
