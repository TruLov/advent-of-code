import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// ordering is important for turning!
const DIR = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1],
};

export function part1(data) {
    const grid = data
        .trim()
        .split('\n')
        .map((row) => row.split(''));

    const start = [grid.length - 2, 1];
    const end = [1, grid[0].length - 2];

    const result = dijkstra(grid, start, end);
    return result;
}

function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const pq = new MinPriorityQueue((state) => state.cost);
    const costs = new Map();
    const startState = { pos: start, dir: '>', cost: 0 };
    pq.enqueue(startState);
    costs.set(`${start[0]},${start[1]},>`, 0);

    while (!pq.isEmpty()) {
        const { pos, dir, cost } = pq.dequeue();
        const [y, x] = pos;

        if (pos[0] === end[0] && pos[1] === end[1]) {
            // found
            return cost;
        }

        // move
        const [dy, dx] = DIR[dir];
        const ny = y + dy;
        const nx = x + dx;

        if (!is_oob(ny, nx, rows, cols) && grid[ny][nx] !== '#') {
            const key = `${ny},${nx},${dir}`;
            const new_cost = cost + 1;
            if (!costs.has(key) || new_cost < costs.get(key)) {
                costs.set(key, new_cost);
                pq.enqueue({ pos: [ny, nx], dir, cost: new_cost });
            }
        }

        // TODO: Combine left and right?
        // turn left
        const left = Object.keys(DIR)[(Object.keys(DIR).indexOf(dir) - 1 + 4) % 4];
        const key_left = `${y},${x},${left}`;
        const cost_left = cost + 1000;
        if (!costs.has[key_left] || cost_left < costs.get(key_left)) {
            costs.set(key_left, cost_left);
            pq.enqueue({ pos: [y, x], dir: left, cost: cost_left });
        }

        // turn right
        const right = Object.keys(DIR)[(Object.keys(DIR).indexOf(dir) + 1) % 4];
        const key_right = `${y},${x},${right}`;
        const cost_right = cost + 1000;
        if (!costs.has(key_right) || cost_right < costs.get(key_right)) {
            costs.set(key_right, cost_right);
            pq.enqueue({ pos: [y, x], dir: right, cost: cost_right });
        }
    }

    return Infinity;
}

export function part2(data) {
    return -1;
}

function is_oob(y, x, rows, cols) {
    return y < 0 || y >= rows || x < 0 || x >= cols;
}
