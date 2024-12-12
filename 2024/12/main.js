export function part1(data) {
    const { grid, is_oob } = parse(data);

    const result = [];
    const global_visited = new Set();

    // find all 'not visited' patches
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const name = `${x},${y}`;
            if (global_visited.has(name)) continue;
            // found new patch
            global_visited.add(name);

            let perimeter = 0;
            const type = grid[y][x];
            const patch_area = new Set(); // local visited
            patch_area.add(`${x},${y}`);
            const queue = [[x, y]];
            // bfs
            while (queue.length) {
                const [px, py] = queue.shift();
                let fences = 0;

                [
                    [px, py - 1],
                    [px, py + 1],
                    [px - 1, py],
                    [px + 1, py],
                ]
                    .filter(([dx, dy]) => !patch_area.has(`${dx},${dy}`))
                    .forEach(([dx, dy]) => {
                        if (is_oob(dx, dy) || grid[dy][dx] !== type) {
                            ++fences;
                        } else {
                            patch_area.add(`${dx},${dy}`);
                            global_visited.add(`${dx},${dy}`);
                            queue.push([dx, dy]);
                        }
                    });
                perimeter += fences;
            }

            result.push({ type: type, area: patch_area.size, perimeter });
        }
    }

    return result.map(({ area, perimeter }) => area * perimeter).reduce((a, b) => a + b);
}

function parse(data) {
    const grid = data
        .trim()
        .split('\n')
        .map((row) => row.split(''));
    const grid_length = grid.length;
    const grid_width = grid[0].length;
    const is_oob = (x, y) => x < 0 || y < 0 || x >= grid_width || y >= grid_length;
    return {
        grid,
        is_oob,
    };
}


export function part2(data) {
    const { grid, is_oob } = parse(data);

    const visited = new Set();

    let total_price = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const name = `${x},${y}`;
            if (visited.has(name)) continue;
            // found new area
            visited.add(name);
            const type = grid[y][x];

            const patch_area = new Set();
            patch_area.add(`${x},${y}`);
            const queue = [[x, y]];
            const edge_map = new Map();

            while (queue.length) {
                const [px, py] = queue.shift();

                [
                    [px, py - 1, 'up'],
                    [px, py + 1, 'down'],
                    [px - 1, py, 'left'],
                    [px + 1, py, 'right'],
                ]
                    .filter(([dx, dy]) => !patch_area.has(`${dx},${dy}`))
                    .forEach(([dx, dy, dir]) => {
                        if (is_oob(dx, dy) || grid[dy][dx] !== type) {
                            if (dir === 'up' || dir === 'down') {
                                const name = `${dir}-${py}`;
                                if (!edge_map.has(name)) {
                                    edge_map.set(`${dir}-${py}`, []);
                                }
                                const edge = edge_map.get(name);
                                edge.push(px);
                            } else {
                                const name = `${dir}-${px}`;
                                if (!edge_map.has(name)) {
                                    edge_map.set(`${dir}-${px}`, []);
                                }
                                const edge = edge_map.get(name);
                                edge.push(py);
                            }
                        } else {
                            patch_area.add(`${dx},${dy}`);
                            visited.add(`${dx},${dy}`);
                            queue.push([dx, dy]);
                        }
                    });
            }

            let sides = 0;
            edge_map.forEach((edge) => edge.sort((a, b) => a - b));
            edge_map.values().forEach((edge) => {
                let group_count = 1;
                for (let i = 0; i < edge.length - 1; i++) {
                    if (edge[i + 1] - edge[i] > 1) {
                        group_count++;
                    }
                }
                sides += group_count;
            });

            const price = patch_area.size * sides;
            total_price += price;
        }
    }

    return total_price;
}