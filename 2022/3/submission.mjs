import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const sacks = raw.split(/\r?\n/).filter(x => x.length);
const compartmentPairs = sacks.map((sack) => divide(sack));
const shared = compartmentPairs.map((pair) => getShared(pair));
const prioritySum1 = shared.reduce((sum, delta) => sum += getPriority(delta), 0);

console.log('prioritySum1', prioritySum1)

function divide(string) {
    let i = string.length / 2;
    
    return [string.substring(0, i), string.substring(i)];
}

function getShared(sacks) {
    const shared = sacks.reduce((acc, curr) => {
        return new Set(
            [...acc].filter(element => new Set([...curr]).has(element))
        );
    }, sacks[0]);

    return shared.values().next().value;
}

function getPriority(letter) {
    const charCode = letter.charCodeAt(0);

    if (charCode > 64 && charCode < 91) {
        return charCode - 38;
    } else if (charCode > 96 && charCode < 123) {
        return charCode - 96;
    } else {
        console.log('character not recognized')
    }
}

// Part 2

const groupedSacks = groupSacks(sacks);
const badges = groupedSacks.flatMap((sackGroup) => getShared(sackGroup));
const prioritySum2 = badges.reduce((sum, delta) => sum += getPriority(delta), 0);

console.log('prioritySum2', prioritySum2)

function groupSacks(sacks, size = 3) {
    let groups = [...Array(Math.ceil(sacks.length / size))];

    return groups.map((_,i) => sacks.slice(i * size, i * size + size))
}
