const DIRECTIONS = [
    // right
    [
        [0, 1],
        [0, 2],
        [0, 3],
    ],
    // left
    [
        [0, -1],
        [0, -2],
        [0, -3],
    ],
    // up
    [
        [-1, 0],
        [-2, 0],
        [-3, 0],
    ],
    // down
    [
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    // diagonal right up
    [
        [-1, 1],
        [-2, 2],
        [-3, 3],
    ],
    // diagonal right down
    [
        [1, 1],
        [2, 2],
        [3, 3],
    ],
    // diagonal left up
    [
        [-1, -1],
        [-2, -2],
        [-3, -3],
    ],
    // diagonal left down
    [
        [1, -1],
        [2, -2],
        [3, -3],
    ],
];

export function part1(data) {
    const grid = data.split('\n').map((row) => row.split(''));

    let result = 0;

    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];

        for (let x = 0; x < row.length; x++) {
            const element = row[x];

            if (element === 'X') {
                const words = getWords(grid, x, y);
                const count = words.filter((word) => word === 'MAS').length;
                result += count;
            }
        }
    }

    return result;
}

export function part2(data) {
    const grid = data.split('\n').map((row) => row.split(''));

    let result = 0;

    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];

        for (let x = 0; x < row.length; x++) {
            const element = row[x];
            if (element === 'A') {
                const directions = [
                    [
                        [-1, 1],
                        [1, -1],
                    ],
                    [
                        [1, 1],
                        [-1, -1],
                    ],
                ];
                const words = getWords(grid, x, y, directions);
                const count = words.filter((word) => word === 'SM' || word === 'MS').length;
                if (count === 2) {
                    result++;
                }
            }
        }
    }

    return result;
}

function getWords(grid, x, y, directions = DIRECTIONS) {
    let words = [];

    for (const direction of directions) {
        let word = '';

        for (const [dx, dy] of direction) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) {
                break;
            }

            const element = grid[newY][newX];

            word += element;
        }

        words.push(word);
    }

    return words;
}
