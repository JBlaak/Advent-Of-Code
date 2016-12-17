const expect = require('expect.js');
const fs = require('fs-promise');

const numberFromLine = line => {
    const [, sectorId, checksum] = line.split('-').pop().match(/(.*)\[(.*)\]/);
    const chars = line.split('-').slice(0, -1).join('').split('');

    const calculatedChecksum = chars
        .reduce((p, c) => {
            //Count chars
            const found = p.find(char => char.char == c);
            if (found) {
                found.count++;
            } else {
                p.push({
                    char: c,
                    count: 1
                })
            }

            return p;
        }, [])
        .sort((a, b) => {
            //Sort using counts or char
            if (a.count > b.count) {
                return -1;
            } else if (a.count < b.count) {
                return 1;
            }

            return a.char.charCodeAt(0) - b.char.charCodeAt(0);
        })
        .slice(0, 5)
        .map(count => count.char)
        .join('');

    return calculatedChecksum === checksum ? parseInt(sectorId) : 0;
};

const solve = str => {
    return str
        .toString()
        .trim()
        .split("\n")
        .reduce((p, c) => p + numberFromLine(c), 0);
};

expect(solve('aaaaa-bbb-z-y-x-123[abxyz]')).to.be(123);
expect(solve('a-b-c-d-e-f-g-h-987[abcde]')).to.be(987);
expect(solve('not-a-real-room-404[oarel]')).to.be(404);
expect(solve('totally-real-room-200[decoy]')).to.be(0);
expect(solve(`
aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]
`)).to.be(123 + 987 + 404);

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data));
    },
    console.error
);

