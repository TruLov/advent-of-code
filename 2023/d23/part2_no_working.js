/**
 * starting IQR bench
 * avarage time part 2:
 */

const DIRECTIONS = {
    d: [0, 1],
    u: [0, -1],
    l: [-1, 0],
    r: [1, 0],
};

export default function solve(input) {
    const map = input.split('\n').map((line) => line.split(''));
    const start_x = map[0].findIndex((cell) => cell === '.');
    const max_y = map.length - 1;
    const max_x = map[max_y].findIndex((cell) => cell === '.');
    const goal = `${max_x},${max_y}`;

    const graph = build_graph(map, start_x, 0);

    // const visited = new Set();
    const stack = [{ node: '1,0', cost: 0, seen: {} }];

    const max_costs = [];

    while (stack.length > 0) {
        stack.sort((a, b) => b.cost - a.cost);
        const current = stack.shift();

        if (current.node === goal) {
            max_costs.push(current.cost);
            continue;
        }

        // visited.add(current.node);
        current.seen[current.node] = 1;

        for (const neighbour in graph[current.node]) {
            const nb_cost = graph[current.node][neighbour];
            if (current.seen[neighbour]) {
                continue;
            }
            stack.push({
                node: neighbour,
                cost: nb_cost + current.cost,
                seen: { ...current.seen },
            });
        }
    }

    return Math.max(...max_costs);
}

function build_graph(map, sx, sy) {
    const nodes_to_check = [[sx, sy]];
    const graph = {};

    while (nodes_to_check.length > 0) {
        const [x, y] = nodes_to_check.shift();

        for (const dir in DIRECTIONS) {
            if (!is_path(map, x + DIRECTIONS[dir][0], y + DIRECTIONS[dir][1])) {
                continue;
            }
            const [ax, ay, steps] = find_next_adjacent_node(x, y, map, dir);
            if (!graph[`${ax},${ay}`]) {
                nodes_to_check.push([ax, ay]);
            }
            add_adjacent_nodes(graph, x, y, ax, ay, steps);
        }
    }

    return graph;
}

function add_adjacent_nodes(graph, x, y, ax, ay, steps) {
    const node_id = `${x},${y}`;
    const adjc_id = `${ax},${ay}`;

    if (!graph[node_id]) {
        graph[node_id] = {};
    }
    if (!graph[node_id][adjc_id]) {
        graph[node_id][adjc_id] = steps;
    }

    if (!graph[adjc_id]) {
        graph[adjc_id] = {};
    }
    if (!graph[adjc_id][node_id]) {
        graph[adjc_id][node_id] = steps;
    }
}

function find_next_adjacent_node(x, y, map, dir) {
    let dx = x + DIRECTIONS[dir][0];
    let dy = y + DIRECTIONS[dir][1];
    const copied_map = copy_map(map);
    copied_map[y][x] = 'O';

    let steps = 0;
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

        steps++;

        if (directions.length !== 1) {
            return [dx, dy, steps];
        }

        copied_map[dy][dx] = 'O';
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
