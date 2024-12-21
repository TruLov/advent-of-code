const DIRECTIONS = [
    [-1, 0, '^'],
    [1, 0, 'v'],
    [0, -1, '<'],
    [0, 1, '>'],
];

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
const L0_KEYPAD = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [undefined, 0, 'A'],
];

const L0_INDIZES = {
    7: [0, 0],
    8: [0, 1],
    9: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    1: [2, 0],
    2: [2, 1],
    3: [2, 2],
    0: [3, 1],
    A: [3, 2],
};

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+
const LEVEL_1_KEYPAD = [
    [undefined, '^', 'A'],
    ['<', 'v', '>'],
];

export function part1(data) {
    const input_sequence = '029A';
    console.log(`Input sequence: ${input_sequence}`);

    let level_0_typing = '';
    let start = [3, 2];
    for (let c of input_sequence) {
        const end = L0_INDIZES[c];
        const queue = [start];
        const visited = new Set();
        visited.add(`${start[0]},${start[1]}`);
        const path_map = new Map();

        while (queue.length > 0) {
            const [y, x] = queue.shift();

            if (y === end[0] && x === end[1]) {
                // found
                const path = [];
                let current = `${y},${x}`;

                // backtrack
                while (path_map.has(current)) {
                    const [dy, dx, dd] = path_map.get(current);
                    path.push(dd);
                    current = `${dy},${dx}`;
                }
                level_0_typing += `${path.reverse().join('')}A`;
                console.log(`From ${start} to ${end}: ${path.reverse()}`);
                break;
            }

            // visit neighbors
            for (const [dy, dx, dd] of DIRECTIONS) {
                const ny = y + dy;
                const nx = x + dx;
                if (
                    ny >= 0 &&
                    ny < 4 &&
                    nx >= 0 &&
                    nx < 3 &&
                    L0_KEYPAD[ny][nx] !== undefined &&
                    !visited.has(`${ny},${nx}`)
                ) {
                    visited.add(`${ny},${nx}`);
                    queue.push([ny, nx]);
                    path_map.set(`${ny},${nx}`, [y, x, dd]);
                }
            }
        }

        start = end;
    }

    return level_0_typing;
}

export function part2(data) {
    return -1;
}
