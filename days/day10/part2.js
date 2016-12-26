const fs = require('fs-promise');

const ASSIGNMENT = 'ASSIGNMENT';
const RULE = 'RULE';
const BOT = 'BOT';
const OUTPUT = 'OUTPUT';

const interpret = sentence => {
    const words = sentence.split(' ');

    if (words[0] === 'value') {
        return {
            type: ASSIGNMENT,
            value: parseInt(words[1], 10),
            bot: parseInt(words[5], 10)
        }
    } else if (words[0] === 'bot') {
        return {
            type: RULE,
            bot: parseInt(words[1], 10),
            low: {
                to: words[5] === 'output' ? OUTPUT : BOT,
                target: parseInt(words[6], 10)
            },
            high: {
                to: words[10] === 'output' ? OUTPUT : BOT,
                target: parseInt(words[11], 10)
            }
        }
    } else {
        throw new Error('Unknown sentence: ' + sentence);
    }
};

const assign = (state, bot, value) => {
    if (!state.bots[bot]) {
        state.bots[bot] = {
            low: null,
            high: null,
            rule: null
        }
    }

    if (state.bots[bot].low === null && state.bots[bot].high === null) {
        state.bots[bot].low = value;
    } else if (state.bots[bot].low < value) {
        state.bots[bot].high = value;
    } else if (state.bots[bot].low > value) {
        state.bots[bot].high = state.bots[bot].low;
        state.bots[bot].low = value;
    } else {
        throw new Error('Ehm, wut');
    }

    if (state.bots[bot].low !== null && state.bots[bot].high !== null) {
        const rule = state.bots[bot].rule;
        if (rule === null) {
            throw new Error('Bot has to transfer but has no rule');
        }

        const low = state.bots[bot].low;
        const high = state.bots[bot].high;

        state.bots[bot].low = null;
        state.bots[bot].high = null;

        if (rule.low.to === BOT) {
            assign(state, rule.low.target, low);
        } else if (rule.low.to === OUTPUT) {
            if(!state.outputs[rule.low.target]) {
                state.outputs[rule.low.target] = [];
            }
            state.outputs[rule.low.target].push(low);
        } else {
            throw new Error('Unknown low target');
        }

        if (rule.high.to === BOT) {
            assign(state, rule.high.target, high);
        } else if (rule.high.to === OUTPUT) {
            if(!state.outputs[rule.high.target]) {
                state.outputs[rule.high.target] = [];
            }
            state.outputs[rule.high.target].push(high);
        } else {
            throw new Error('Unknown high target');
        }
    }
};

const solve = str => {
    return str
        .trim()
        .split("\n")
        .reduce((p, c, i, data) => {
            const command = interpret(c);
            if (command.type === ASSIGNMENT) {
                p.assignments.push(command);
            } else if (command.type === RULE) {
                p.rules.push(command);
            } else {
                throw new Error('Unknown command type: ' + command.type);
            }

            //Return an array with rules first then assignments, since want them to be processed in that order
            if (i === data.length - 1) {
                return [...p.rules, ...p.assignments];
            }

            return p;
        }, {assignments: [], rules: []})
        .reduce(
            (p, command) => {
                if (command.type === ASSIGNMENT) {
                    assign(p, command.bot, command.value);
                } else if (command.type === RULE) {
                    if (!p.bots[command.bot]) {
                        p.bots[command.bot] = {
                            low: null,
                            high: null
                        }
                    }

                    p.bots[command.bot].rule = command;
                } else {
                    throw new Error('Unknown command type: ' + command.type);
                }

                return p;
            },
            {
                assignments: [],
                bots: [],
                outputs: []
            }
        );
};

const input = `
value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2
`;

solve(input);

fs.readFile('input.txt').then(data => {
    const result = solve(data.toString()).outputs;
    
    console.log(result[0][0] * result[1][0] * result[2][0]);
});
