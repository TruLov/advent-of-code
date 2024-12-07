const DIRECTIONS = {
    '^': { x: 0, y: -1 },
    v: { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
    '>': { x: 1, y: 0 },
};

export function part1(data) {
    const grid = data
        .trim()
        .split('\n')
        .map((row) => row.split(''));
    const width = grid[0].length;
    const height = grid.length;

    let { x, y } = findGuard(grid);

    while (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        const d = DIRECTIONS[grid[y][x]];
        const next = grid[y + d.y][x + d.x];
        if (next === '#') {
            grid[y][x] = turnRight(grid[y][x]);
            continue;
        }

        grid[y + d.y][x + d.x] = grid[y][x];
        grid[y][x] = 'X';
        x += d.x;
        y += d.y;
    }

    // count all 'X' in the grid
    const result = grid
        .map((line) => line.filter((cell) => cell === 'X').length)
        .reduce((a, b) => a + b, 0);

    return result + 1; // last oob 'X' ist not counted
}

export function part2(data) {
    return result;
}

function turnRight(dir) {
    switch (dir) {
        case '^':
            return '>';
        case '>':
            return 'v';
        case 'v':
            return '<';
        case '<':
            return '^';
    }
}

function findGuard(grid) {
    const width = grid[0].length;
    const height = grid.length;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (Object.keys(DIRECTIONS).includes(grid[i][j])) {
                return { x: j, y: i };
            }
        }
    }
}
