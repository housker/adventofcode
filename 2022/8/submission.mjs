import { promises as fs } from 'fs';

const raw = await fs.readFile('./input.txt', 'utf8');
const lines = raw.split(/\r?\n/).filter(x => x.length);

function makeMatrix(lines) {
    let matrix = Array(lines[0].length).fill([]);

    lines.forEach((line, index) => {
        matrix[index] = line.split('').map((tree, i) => ({
            height: parseInt(tree),
            n: isVisibleFromN(matrix, i, parseInt(tree)),
            s: undefined,
            w: isVisibleFromW(line.slice(0, i), parseInt(tree)),
            e: undefined,
        }));
    });

    return matrix;
}

let matrix = makeMatrix(lines);

matrix.forEach((row, index) => {
    row.forEach((tree, i) => {
        let eTrees = row.slice(i + 1);
        matrix[index][i].e = isVisibleFromE(eTrees, tree);
        matrix[index][i].s = isVisibleFromS(matrix.slice(index + 1), i, tree)
    });
})

let totalVisibleTrees = 0;

matrix.forEach((row) => {
    row.forEach((tree) => {
        if(tree.n.isVisible || tree.s.isVisible || tree.e.isVisible || tree.w.isVisible) {
            ++totalVisibleTrees;
        }
    });
})

console.log('totalVisibleTrees', totalVisibleTrees)

function isVisibleFromN(nMatrix, i, tree) {
    let nColumn = nMatrix.map((row) => row[i]?.height).filter((x) => x !== undefined).reverse();
    let isBlocked = false;
    let visibleTrees = 0;

    nColumn.forEach((nTree) => {
        if (!isBlocked) {
            ++visibleTrees;
        }
        if (nTree >= tree) {
            isBlocked = true;
        }
    });

    return {
        visibleTrees,
        isVisible: !isBlocked,
    };
}

function isVisibleFromS(sMatrix, i, tree) {
    let sColumn = sMatrix.map((row) => row[i]?.height).filter((x) => x !== undefined);

    let isBlocked = false;
    let visibleTrees = 0;

    sColumn.forEach((sTree) => {
        if (!isBlocked) {
            ++visibleTrees;
        }
        if (sTree >= tree.height) {
            isBlocked = true;
        }
    });

    return {
        visibleTrees,
        isVisible: !isBlocked,
    };
}

function isVisibleFromW(wTrees, tree) {
    wTrees = wTrees.split('').filter((x) => x !== undefined).reverse();

    let isBlocked = false;
    let visibleTrees = 0;

    wTrees.forEach((wTree) => {
        if (!isBlocked) {
            ++visibleTrees;
        }
        if (wTree >= tree) {
            isBlocked = true;
        }
    });

    return {
        visibleTrees,
        isVisible: !isBlocked,
    };
}

function isVisibleFromE(eTrees, tree) {
    eTrees = eTrees.map((tree) => tree.height).filter((x) => x !== undefined);

    let isBlocked = false;
    let visibleTrees = 0;

    eTrees.forEach((eTree) => {
        if (!isBlocked) {
            ++visibleTrees;
        }
        if (eTree >= tree.height) {
            isBlocked = true;
        }
    });

    return {
        visibleTrees,
        isVisible: !isBlocked,
    };
}

// Part 2

let highestScore = 0;

matrix.forEach((row) => {
    row.forEach((item) => {
        const scenicScore = 
            item.n.visibleTrees *
            item.s.visibleTrees *
            item.w.visibleTrees *
            item.e.visibleTrees;
        
        if (scenicScore > highestScore) {
            highestScore = scenicScore;
        }
    })
})

console.log('highestScore', highestScore)