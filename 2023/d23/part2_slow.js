/**
 * starting IQR bench
 * avarage time part 2:
 */

const DIRECTIONS = {
    v: [0, 1],
    '^': [0, -1],
    '<': [-1, 0],
    '>': [1, 0],
};

export default function solve(input) {
    const map = input.split('\n').map((line) => line.split(''));
    const start_x = map[0].findIndex((cell) => cell === '.');
    const goal_x = map[map.length - 1].findIndex((cell) => cell === '.');
    const steps = find_longest_hike(map, start_x, 0, goal_x, map.length - 1);
    return steps;
}

function find_longest_hike(map, sx, sy, gx, gy) {
    const intersections = [[sx, sy, map]];
    const possible_hikes = [];

    while (intersections.length > 0) {
        const [x, y, copied_map] = intersections.pop();
        const next_intersections = [];
        copied_map[y][x] = 'O';

        // right
        if (is_path(copied_map, x + 1, y)) {
            next_intersections.push(find_next_intersection([x + 1, y, copied_map]));
        }

        // left
        if (is_path(copied_map, x - 1, y)) {
            next_intersections.push(find_next_intersection([x - 1, y, copied_map]));
        }

        // up
        if (is_path(copied_map, x, y - 1)) {
            next_intersections.push(find_next_intersection([x, y - 1, copied_map]));
        }

        // down
        if (is_path(copied_map, x, y + 1)) {
            next_intersections.push(find_next_intersection([x, y + 1, copied_map]));
        }

        next_intersections.forEach(([x, y, copied_map]) => {
            if (x === gx && y === gy) {
                possible_hikes.push(
                    copied_map
                        .map((line) => line.join(''))
                        .map((string) => string.match(/O/g))
                        .reduce((a, b) => a + b.length, -1)
                );
            } else {
                intersections.push([x, y, copied_map]);
            }
        });
    }

    return Math.max(...possible_hikes);
}

function find_next_intersection([x, y, map]) {
    let dx = x;
    let dy = y;
    const copied_map = copy_map(map);

    for (;;) {
        const directions = [];

        if (is_path(copied_map, dx + 1, dy)) {
            directions.push([dx + 1, dy]);
        }
        if (is_path(copied_map, dx - 1, dy)) {
            directions.push([dx - 1, dy]);
        }
        if (is_path(copied_map, dx, dy + 1)) {
            directions.push([dx, dy + 1]);
        }
        if (is_path(copied_map, dx, dy - 1)) {
            directions.push([dx, dy - 1]);
        }

        if (directions.length > 1) {
            return [dx, dy, copied_map];
        }

        copied_map[dy][dx] = 'O';
        if (directions.length === 0) {
            return [dx, dy, copied_map];
        }
        dx = directions[0][0];
        dy = directions[0][1];
    }
}

function copy_map(map) {
    return [...map.map((line) => [...line])];
}

function is_path(map, x, y) {
    const is_oob = x < 0 || y < 0 || x >= map[0].length || y >= map.length;
    return !is_oob && ['.', '>', '<', 'v', '^'].includes(map[y][x]);
}
