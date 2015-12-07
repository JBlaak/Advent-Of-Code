'use strict';
import expect from 'expect';
import {readFileSync, writeFileSync} from 'fs';

Array.prototype.dmap = function (xs, ys, xe, ye, callback) {
    return this.map((r, x) => r.map((v, y) => {
        return x >= xs && x <= xe && y >= ys && y <= ye ? callback(v) : v
    }));
};

function grid(w, h) {
    let theGrid = [];
    for (var y = 0; y < w; y++) {
        let row = [];
        for (var x = 0; x < h; x++) row.push(0);
        theGrid.push(row);
    }
    return theGrid
}

function probablyAFireHazard(input) {
    return input.split("\n")
        .reduce((p, c, i, a) => {
            let [, command, xs, ys, xe, ye] = c.match(/(.*)\ ([0-9]{0,3}),([0-9]{0,3})\ through\ ([0-9]{0,3}),([0-9]{0,3})/i);

            switch (command) {
                case 'turn on':
                    p = p.dmap(xs, ys, xe, ye, () => 1);
                    break;
                case 'turn off':
                    p = p.dmap(xs, ys, xe, ye, () => 0);
                    break;
                case 'toggle':
                    p = p.dmap(xs, ys, xe, ye, (v) => v == 0 ? 1 : 0);
                    break;
                default:
                    throw 'Unknown command: ' + command
            }

            return p
        }, grid(1000, 1000))
        .reduce((p, c) => p + c.reduce((p, c) => p + c, 0), 0);
}

/* Examples */
expect(probablyAFireHazard('turn on 0,0 through 999,999')).toBe(1000000);
expect(probablyAFireHazard('turn on 0,0 through 999,0')).toBe(1000);
expect(probablyAFireHazard('turn on 499,499 through 500,500')).toBe(4);

/* Test */
var toggle = ['turn on 0,0 through 999,999', 'toggle 0,0 through 999,0'].join("\n");
expect(probablyAFireHazard(toggle)).toBe(1000000 - 1000);

var off = ['turn on 0,0 through 999,999', 'turn off 0,0 through 999,0'].join("\n");
expect(probablyAFireHazard(off)).toBe(1000000 - 1000);

/* From input */
let input = readFileSync('./days/day6/input.txt', 'utf8');
console.log(probablyAFireHazard(input));

