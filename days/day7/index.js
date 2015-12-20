'use strict';
import expect from 'expect';
import {readFileSync} from 'fs';

let ASSIGNMENT = '1';
let UNARY = '2';
let BITWISE = '3';

let operations = [
    //Plain assignment
    {
        appliesToCommand: (parts, target) =>  parts.length == 3 && parts[1] == "->" && parts[0].isNumeric() && target == parts[2],
        build(parts) {
            return {
                type: ASSIGNMENT,
                target: parts[2],
                execute() {
                    return parseInt(parts[0]);
                }
            }
        }
    },
    //Variable assignment
    {
        appliesToCommand: (parts, target) => parts.length == 3 && parts[1] == "->" && !parts[0].isNumeric() && target == parts[2],
        build(parts) {
            return {
                type: UNARY,
                operand: parts[0],
                target: parts[2],
                execute(input) {
                    return input;
                }
            }
        }
    },
    //NOT
    {
        appliesToCommand: (parts, target) => parts.length == 4 && parts[0] == 'NOT' && target == parts[3],
        build(parts) {
            return {
                type: UNARY,
                operand: parts[1],
                target: parts[3],
                execute(input) {
                    return ~input;
                }
            }
        }
    },

    //LSHIFT
    {
        appliesToCommand: (parts, target) => parts.length == 5 && parts[1] == 'LSHIFT' && target == parts[4],
        build(parts) {
            return {
                type: UNARY,
                operand: parts[0],
                target: parts[4],
                execute(input) {
                    return input << parseInt(parts[2]);
                }
            }
        }
    },

    //RSHIFT
    {
        appliesToCommand: (parts, target) => parts.length == 5 && parts[1] == 'RSHIFT' && target == parts[4],
        build(parts) {
            return {
                type: UNARY,
                operand: parts[0],
                target: parts[4],
                execute(input) {
                    return input >> parseInt(parts[2]);
                }
            }
        }
    },

    //AND
    {
        appliesToCommand: (parts, target) => parts.length == 5 && parts[1] == 'AND' && target == parts[4],
        build(parts) {
            return {
                type: BITWISE,
                left: parts[0],
                right: parts[2],
                target: parts[4],
                execute(left, right) {
                    return left & right;
                }
            }
        }
    },

    //OR
    {
        appliesToCommand: (parts, target) => parts.length == 5 && parts[1] == 'OR' && target == parts[4],
        build(parts) {
            return {
                type: BITWISE,
                left: parts[0],
                right: parts[2],
                target: parts[4],
                execute(left, right) {
                    return left | right;
                }
            }
        }
    }
];

String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this));
}

Number.prototype.toUint16 = function () {
    return this <= 65535 && this >= 0 ? this : new Uint16Array([this])[0];
};

Array.prototype.findOperator = function (target) {
    for (var i in operations) {
        if (operations.hasOwnProperty(i)) {
            for (var j in this) {
                if (
                    this.hasOwnProperty(j)
                    && operations[i].appliesToCommand(this[j], target)
                ) {
                    return operations[i].build(this[j]);
                }
            }
        }
    }

    throw `No operator found for: "${target}"`;
};

function traverse(lines, target, operators = {}) {
    if (target.isNumeric()) {
        return parseInt(target).toUint16();
    }

    if (!operators[target]) {
        operators[target] = lines.findOperator(target);
    }

    switch (operators[target].type) {
        case ASSIGNMENT:
            return operators[target].execute().toUint16();
            break;
        case UNARY:
            return operators[target].execute(
                traverse(lines, operators[target].operand, operators)
            ).toUint16();
            break;
        case BITWISE:
            return operators[target].execute(
                traverse(lines, operators[target].left, operators),
                traverse(lines, operators[target].right, operators)
            ).toUint16();
            break;
    }

    return 'Unkown';
}

function part1(input, target) {
    let lines = input.split("\n").map(line => line.split(' '));

    return traverse(lines, target);
}

/* Example part 1*/
let exampleInput = readFileSync('./days/day7/example.txt', 'utf8');
expect(part1(exampleInput, 'i')).toBe(65079);
expect(part1(exampleInput, 'h')).toBe(65412);
expect(part1(exampleInput, 'g')).toBe(114);
expect(part1(exampleInput, 'f')).toBe(492);
expect(part1(exampleInput, 'e')).toBe(507);
expect(part1(exampleInput, 'd')).toBe(72);
expect(part1(exampleInput, 'x')).toBe(123);
expect(part1(exampleInput, 'y')).toBe(456);
expect(part1(exampleInput, 'ba')).toBe(114);

/* From input */
let inputForPart1 = readFileSync('./days/day7/input.txt', 'utf8');
console.log('Part 1: ' + part1(inputForPart1, 'a'));

