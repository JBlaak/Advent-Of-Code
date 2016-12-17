const expect = require('expect.js');
const fs = require('fs-promise');

function rotate90(a) {
    // transpose from http://www.codesuck.com/2012/02/transpose-javascript-array-in-one-line.html
    a = Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
    // row reverse
    for (i in a) {
        a[i] = a[i].reverse();
    }
    return a;
}

const solve = str => {
    return str
        .toString()
        .trim()
        .split("\n")
        .map(line => {
            //Parse
            return line
                .split(' ')
                .filter(v => v.trim() !== '')
                .map(v => parseInt(v));
        })
        .reduce((p, line) => {
            //Group by 3
            if (p.length == 0 || p[p.length - 1].length % 3 === 0) {
                p.push([]);
            }

            p[p.length - 1].push(line);

            return p;
        }, [])
        .reduce((p, c) => {
            //Rotate
            return [...p, ...rotate90(c)];
        }, [])
        .reduce((p, line) => {
            //Calculate correctness
            const sorted = line.sort((a, b) => a - b);

            return sorted[2] >= (sorted[0] + sorted[1]) ? p : p + 1
        }, 0);
};

expect(solve(`
  5      8   17
  823  909    9
  823  821    9
  3    8     17
  823  909    9
  823  821    9
`)).to.be(4);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    },
    console.error
);

