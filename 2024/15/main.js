export function part1(data) {
    const { grid, instructions } = parse(data);

    let [y, x] = findRobot('@', grid);

    while (instructions.length > 0) {
        const [dy, dx] = instructions.shift();

        // try to move
        if (grid[y + dy][x + dx] === '#') continue;
        if (grid[y + dy][x + dx] === '.') {
            grid[y][x] = '.';
            y += dy;
            x += dx;
            grid[y][x] = '@';
            continue;
        }

        // look ahead if you can push
        let c = 1;
        while (grid[y + c * dy][x + c * dx] === 'O') c++;
        if (grid[y + c * dy][x + c * dx] === '#') continue;

        // push
        while (c > 0) {
            grid[y + c * dy][x + c * dx] = grid[y + (c - 1) * dy][x + (c - 1) * dx];
            c--;
        }

        // and move
        grid[y][x] = '.';
        y += dy;
        x += dx;
    }

    return calc_gps(grid, 'O');
}

export function part2(data) {
    let { grid, instructions } = parse(data);
    grid = grid.map((row) =>
        row
            .map((node) => {
                if (node === '#') return ['#', '#'];
                if (node === '.') return ['.', '.'];
                if (node === 'O') return ['[', ']'];
                if (node === '@') return ['@', '.'];
            })
            .flat()
    );

    const is_infront = (y, x, dy) => {
        if (grid[y][x] === '#') return true;
        if (grid[y][x] === '.') return false;
        if (grid[y][x] === '[') {
            // check x and x+1
            return is_infront(y + dy, x, dy) || is_infront(y + dy, x + 1, dy);
        }
        if (grid[y][x] === ']') {
            // check x and x-1
            return is_infront(y + dy, x, dy) || is_infront(y + dy, x - 1, dy);
        }
    };

    const push = (y, x, dy, c) => {
        if (grid[y + dy][x] === '.') {
            grid[y + dy][x] = grid[y][x];
        } else if (grid[y + dy][x] === grid[y][x]) {
            push(y + dy, x, dy, grid[y][x]);
        } else {
            if (grid[y + dy][x] === ']') {
                // push x and x-1
                push(y + dy, x, dy, grid[y][x]);
                push(y + dy, x - 1, dy, '.');
            } else {
                // push x and x+1
                push(y + dy, x, dy, grid[y][x]);
                push(y + dy, x + 1, dy, '.');
            }
        }
        grid[y][x] = c;
    };

    let [y, x] = findRobot('@', grid);

    while (instructions.length > 0) {
        const [dy, dx] = instructions.shift();

        // try to move
        if (grid[y + dy][x + dx] === '#') continue;
        if (grid[y + dy][x + dx] === '.') {
            grid[y][x] = '.';
            y += dy;
            x += dx;
            grid[y][x] = '@';
            continue;
        }

        // look ahead if you can push
        if (dy === 0) {
            // horizontal movement
            let c = 1;
            while (grid[y + c * dy][x + c * dx] === '[' || grid[y + c * dy][x + c * dx] === ']') {
                c++;
            }
            if (grid[y + c * dy][x + c * dx] === '#') continue;

            // push
            while (c > 0) {
                grid[y + c * dy][x + c * dx] = grid[y + (c - 1) * dy][x + (c - 1) * dx];
                c--;
            }

            // and move
            grid[y][x] = '.';
            y += dy;
            x += dx;
        } else {
            // vertical movement
            const is_something_in_front = is_infront(y + dy, x, dy);
            if (is_something_in_front) continue;
            if (grid[y + dy][x] === '[') {
                push(y + dy, x, dy, '@');
                push(y + dy, x + 1, dy, '.');
            } else if (grid[y + dy][x] === ']') {
                push(y + dy, x, dy, '@');
                push(y + dy, x - 1, dy, '.');
            }
            grid[y][x] = '.';
            y += dy;
            x += dx;
        }
    }

    return calc_gps(grid, '[');
}

function calc_gps(grid, c) {
    let gps = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === c) gps += 100 * y + x;
        }
    }
    return gps;
}

function parse(data) {
    const [grid_raw, instructions_raw] = data.trim().split('\n\n');
    const grid = grid_raw.split('\n').map((row) => row.split(''));
    const DIR = {
        '^': [-1, 0],
        'v': [1, 0],
        '<': [0, -1],
        '>': [0, 1],
    };
    const instructions = instructions_raw
        .split('')
        .map((i) => DIR[i])
        .filter((x) => x);

    return {
        grid,
        instructions,
    };
}

function findRobot(value, grid) {
    const width = grid[0].length;
    const height = grid.length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === value) {
                return [y, x];
            }
        }
    }
}
