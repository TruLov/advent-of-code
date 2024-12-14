const SECONDS = 100;

const GRID_X_MAX = 101;
const GRID_Y_MAX = 103;

const GRID_X_MID = Math.floor(GRID_X_MAX / 2);
const GRID_Y_MID = Math.floor(GRID_Y_MAX / 2);

export function part1(data) {
    const robots = parse(data);
    const result = robots.map((r) => calculate_new_position(r));

    // vizualize the result
    console.log(`\npart1:`);
    console.log(vizualize(result));
    console.log(`-----------------------------\n`);

    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    result.forEach(([x, y]) => {
        if (x === GRID_X_MID || y === GRID_Y_MID) return;
        if (x < GRID_X_MID && y < GRID_Y_MID) q1++;
        if (x > GRID_X_MID && y < GRID_Y_MID) q2++;
        if (x < GRID_X_MID && y > GRID_Y_MID) q3++;
        if (x > GRID_X_MID && y > GRID_Y_MID) q4++;
    });

    return q1 * q2 * q3 * q4;
}

export function part2(data) {
    const robots = parse(data);

    for (let i = 0; i < 99999; i++) {
        const result = robots.map((r) => calculate_new_position(r, i));
        // transform result to grid
        const grid = Array.from({ length: GRID_Y_MAX }, () => Array(GRID_X_MAX).fill(0));
        result.forEach(([x, y]) => {
            grid[y][x] = 1;
        });

        // find a robot that is surrounded by other robots via the grid
        // <https://www.reddit.com/r/adventofcode/comments/1hdvhvu/comment/m1zyjk2/>
        for (let y = 1; y < GRID_Y_MAX - 1; y++) {
            for (let x = 1; x < GRID_X_MAX - 1; x++) {
                if (grid[y][x] === 0) continue;
                // check sides
                if (
                    grid[y - 1][x] === 0 ||
                    grid[y + 1][x] === 0 ||
                    grid[y][x - 1] === 0 ||
                    grid[y][x + 1] === 0
                )
                    continue;
                // check corners
                if (
                    grid[y - 1][x - 1] === 0 ||
                    grid[y - 1][x + 1] === 0 ||
                    grid[y + 1][x - 1] === 0 ||
                    grid[y + 1][x + 1] === 0
                )
                    continue;

                console.log(`\npart1:`);
                console.log(vizualize(result, false));
                console.log(`-----------------------------\n`);

                return i;
            }
        }
    }
}

function vizualize(result, remove_middle = true) {
    // vizualize the result
    const v_grid = Array.from({ length: GRID_Y_MAX }, () => Array(GRID_X_MAX).fill('.'));
    result.forEach(([x, y]) => {
        if (v_grid[y][x] === '.') {
            v_grid[y][x] = 1;
        } else {
            v_grid[y][x]++;
        }
    });

    // // remove middle lines between quadrants
    if (remove_middle) {
        v_grid[GRID_Y_MID].fill(' ');
        v_grid.forEach((row) => {
            row[GRID_X_MID] = ' ';
        });
    }
    // join rows to string
    return v_grid.map((row) => row.join('')).join('\n');
}

function calculate_new_position(
    { p: [px, py], v: [vx, vy] },
    seconds = SECONDS,
    max_x = GRID_X_MAX,
    max_y = GRID_Y_MAX
) {
    const new_x = mod(px + vx * seconds, max_x);
    const new_y = mod(py + vy * seconds, max_y);

    return [new_x, new_y];
}

const mod = (n, m) => ((n % m) + m) % m;

function parse(data) {
    const lines = data.trim().split('\n');
    lines.forEach((line, i) => {
        const [p, v] = line
            .split(' ')
            .map((vector_raw) => vector_raw.substring(2).split(',').map(Number));
        lines[i] = { p, v };
    });

    return lines;
}
