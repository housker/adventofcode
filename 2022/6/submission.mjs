import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');

function findUniqueConsecutive(numDistinct, input) {
    let currArr = input.slice(0, numDistinct);
    let currSet = new Set(currArr);
    
    let i = numDistinct;
    while (currSet.size < currArr.length) {
        currArr = input.slice(i - numDistinct + 1, i + 1);
        currSet = new Set(currArr);
        ++i;
    }
    return i;
}

console.log(findUniqueConsecutive(4, raw));

// Part 2

console.log(findUniqueConsecutive(14, raw));