const expect = require('expect.js');
const fs = require('fs-promise');

const solve = (str) => {
    const chars = str.toString().split('').filter(char => char.trim() !== '');

    let result = '';
    let isGatheringInstruction = false;
    let instruction = '';
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '(') {
            isGatheringInstruction = true;
        } else if (chars[i] === ')') {
            const [rangeStr, timesStr] = instruction.split('x');
            const range = parseInt(rangeStr);
            const times = parseInt(timesStr);

            //Apply action
            const selected = chars.slice(i + 1, i + 1 + range).join('');
            for (let t = 0; t < times; t++) {
                result += selected;
            }

            //For the next iteration skip a number of characters after this one
            i += range;

            instruction = '';
            isGatheringInstruction = false;
        } else if (isGatheringInstruction) {
            instruction += chars[i];
        } else {
            result += chars[i];
        }
    }

    return result;
};

expect(solve('ADVENT').length).to.be(6);
expect(solve('A(1x5)BC').length).to.be(7);
expect(solve('(3x3)XYZ').length).to.be(9);
expect(solve('A(2x2)BCD(2x2)EFG').length).to.be(11);
expect(solve('(6x1)(1x3)A').length).to.be(6);
expect(solve('X(8x2)(3x3)ABCY').length).to.be(18);


fs.readFile('input.txt').then(
    data => {
        console.log(solve(data).length);
    }
);

