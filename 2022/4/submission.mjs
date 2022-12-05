import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const assignmentPairs = raw.split(/\r?\n/).filter(x => x.length);
const assignments = assignmentPairs.map((pair) => pair.split(','));

const totalContained1 = assignments.reduce((acc, curr) => {
    const firstEncompasses = getMinimum(curr[0]) <= getMinimum(curr[1]) && getMaximum(curr[0]) >= getMaximum(curr[1]);
    const secondEncompasses = getMinimum(curr[0]) >= getMinimum(curr[1]) && getMaximum(curr[0]) <= getMaximum(curr[1]);

    if(firstEncompasses || secondEncompasses) {
        return ++acc;
    }
    return acc;
}, 0);

console.log('totalContained1', totalContained1);

function getMinimum(range) {
    return parseInt(range.match(/(\d+)-/)[1]);
}

function getMaximum(range) {
    return parseInt(range.match(/-(\d+)/)[1]);
}

// Part 2

const totalContained2 = assignments.reduce((acc, curr) => {
    const minOverlaps = getMinimum(curr[0]) >= getMinimum(curr[1])  && getMinimum(curr[0]) <= getMaximum(curr[1]);
    const maxOverlaps = getMinimum(curr[1]) >= getMinimum(curr[0])  && getMinimum(curr[1]) <= getMaximum(curr[0]);

    if(minOverlaps || maxOverlaps) {
        return ++acc;
    }
    return acc;
}, 0);

console.log('totalContained2', totalContained2);
