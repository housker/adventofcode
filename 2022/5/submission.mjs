import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const rawInitialOrder = raw.slice(0, raw.indexOf('9') + 1);
const initialOrder = rawInitialOrder.matchAll(/\[(\w)\]/g);
const matrix = makeMatrix(initialOrder);
const rawInstructions = raw.slice(raw.indexOf('9') + 1);
const instructions = rawInstructions.split(/\r?\n/).filter(x => x.length > 10);

let mutableMatrix1 = JSON.parse(JSON.stringify(matrix));

instructions.forEach(reOrder);

console.log(Object.values(mutableMatrix1).map((x) => x[x.length - 1]).join(''))

function makeMatrix(iterator) {
    let matrix = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
    };

    let result = iterator.next();

    while (!result.done) {
        let index = result.value.index;
        let matrixIndex = (index / 4) % 9;

        matrix[matrixIndex].unshift(result.value[1])
        result = iterator.next();
    }

    return matrix;
}

function reOrder(instruction) {
    let startI = parseInt(instruction.match(/from (\d)/)[1]) - 1;
    let endI = parseInt(instruction.match(/to (\d)/)[1]) - 1;
    let times = parseInt(instruction.match(/move (\d+)/)[1]);

    while(times > 0) {
        let item = mutableMatrix1[startI].pop();
        mutableMatrix1[endI].push(item);
        times--;
    }
    return;
}

// Part 2

let mutableMatrix2 = JSON.parse(JSON.stringify(matrix));

instructions.forEach(reOrder9001);

console.log(Object.values(mutableMatrix2).map((x) => x[x.length - 1]).join(''))

function reOrder9001(instruction) {
    let startI = parseInt(instruction.match(/from (\d)/)[1]) - 1;
    let endI = parseInt(instruction.match(/to (\d)/)[1]) - 1;
    let times = parseInt(instruction.match(/move (\d+)/)[1]);

    while(times > 0) {
        let items = mutableMatrix2[startI].slice(-times);
        mutableMatrix2[startI] = mutableMatrix2[startI].slice(0, mutableMatrix2[startI].length - times);
        mutableMatrix2[endI].push(...items);
        times -= times;
    }
    return;
}