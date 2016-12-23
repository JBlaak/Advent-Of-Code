const fs = require('fs-promise');

const solve = (str) => {
    if (str.length === 0 || str.indexOf('(') === -1) {
        return str.length;
    }

    const chars = str.split('').filter(char => char.trim() !== '');

    let result = 0;
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
            result += times * solve(chars.slice(i + 1, i + 1 + range).join(''));

            //For the next iteration skip a number of characters after this one
            i += range;

            instruction = '';
            isGatheringInstruction = false;
        } else if (isGatheringInstruction) {
            instruction += chars[i];
        } else {
            result++;
        }
    }

    return result;
};

fs.readFile('input.txt').then(
    data => {
        console.log(solve(data.toString()));
    }
).catch(console.error);

