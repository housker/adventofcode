import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const lines = raw.split(/\r?\n/).filter(x => x.length);

function getTree(lines) {
    let tree = { size: 0 };
    let filePath = [];

    lines.forEach((line) => {
        let change, file, directory;
        if (change = isChange(line)) {
            filePath = updateFilePath(filePath, change);
        } else {
            let currDirectory = tree;
            filePath.forEach((directory) => currDirectory = currDirectory[directory]);

            if(file = isFile(line)) {
                let size = parseInt(file[1]);
                currDirectory[file[2]] = size;
                addSize(tree, filePath, size);
            } else if(directory = isDirectory(line)) {
                currDirectory[directory[2]] = { size: 0 };
            }
        }
    })

    return tree;
}

function isFile(line) {
    return line.match(/(\d+)\s(\w+\.?\w*)/);
}

function isDirectory(line) {
    return line.match(/(dir)\s(\w+)/);
}

function isChange(line) {
    return line.match(/(cd)\s(\.{2}|\/|\w+)/);
}

function updateFilePath(filePath, change) {
    let direction = change[2];
    if(direction === '/') {
        return [];
    } else if(direction === '..') {
        filePath.pop();
    } else {
        filePath.push(direction);
    }

    return filePath;
}

function addSize(tree, filePath, size) {
    let currDirectory = tree;
    currDirectory.size += size;

    filePath.forEach((directory) => {
        currDirectory = currDirectory[directory];
        currDirectory.size += size;
    });
}

let globalTotal = 0;

let deletionContenders = [];

function traverse(o) {
    for (var i in o) {
        if (!!o[i] && typeof(o[i])=="object") {
            traverse(o[i]);
        } else if (i === 'size') {
            if (o[i] <= 100000) {
                globalTotal += o[i];
            }

            // Part 2
            if (o[i] >= 1735494) {
                deletionContenders.push(o[i]);
            }
        }
    }
}

const completeTree = getTree(lines);
traverse(completeTree);

console.log('globalTotal', globalTotal)

// Part 2

let threshold = 30000000 - (70000000 - completeTree.size); // 1735494

console.log('deletionContender', deletionContenders.sort((a, b) => a - b)[0]);