import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const rounds = raw.split(/\r?\n/).filter(x => x.length);
const choices = rounds.map((x) => x.split(' '));
const outcomes = choices.map((choice, i) => getScore(getOutcome(choice[0], choice[1]), choice[1]));
const totalScore = outcomes.reduce((a, b) => a += b);

console.log('totalScore', totalScore)

function getOutcome(them, me) {
    const theirChoice = ['A', 'B', 'C'].indexOf(them);
    const myChoice = ['X', 'Y', 'Z'].indexOf(me);

    return (theirChoice + 3 - myChoice) % 3;
}

function getScore(win, choice) {
    const winLookup = {
        2: 6, 
        1: 0,
        0: 3,
    };

    const choiceLookup = {
        X: 1,
        Y: 2,
        Z: 3,
    };

    return winLookup[win] + choiceLookup[choice];
}

// Part 2

function getOutcomeConversions(them, me) {
    let conversionsMap = {
        A: {
            X: 'Z',
            Y: 'X',
            Z: 'Y',
        },
        B: {
            X: 'X',
            Y: 'Y',
            Z: 'Z',
        },
        C: {
            X: 'Y',
            Y: 'Z',
            Z: 'X',
        },
    }

    return conversionsMap[them][me];
}

const outcomes2 = choices.map((choice, i) => {
    const outcome = ['Y', 'X', 'Z'].indexOf(choice[1]);
    let myChoice = getOutcomeConversions(choice[0], choice[1]);

    return getScore(outcome, myChoice);
})

const totalScore2 = outcomes2.reduce((a, b) => a += b);

console.log('totalScore2', totalScore2)
