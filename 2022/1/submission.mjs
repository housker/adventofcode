import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const elfs = raw.split(/\r?\n\n/).filter(x => x.length);

const total = elfs.map((elf) => {
    const food = elf.split(/\r?\n/).map((string) => parseInt(string));

    return food.reduce((a, b) => a += b, 0);
}).filter((x) => Boolean(x))

const max = Math.max(...total)
console.log('max', max)

// Part 2

const topThree = total.sort((a, b) => b-a).slice(0, 3);
const total2 = topThree.reduce((a, b) => a += b, 0);
console.log('total2', total2);
