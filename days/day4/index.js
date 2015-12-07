'use strict';
import expect from 'expect';
import crypto from 'crypto';
import {readFileSync} from 'fs';

function theIdealStockingStuffer(input) {
    let value = -1;
    do
        value++;
    while (!crypto.createHash('md5').update(input + String(value)).digest("hex").startsWith('00000'));
    return value;
}

/* Examples */
expect(theIdealStockingStuffer('abcdef')).toBe(609043);
expect(theIdealStockingStuffer('pqrstuv')).toBe(1048970);

/* From input */
console.log(theIdealStockingStuffer('yzbqklnj'));
