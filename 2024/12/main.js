export function part1(data) {
    const { grid, cols, rows, is_oob } = parse(data);
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const result = [];

    // find all 'not visited' patches
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (visited[y][x]) continue;

            // Found new patch
            visited[y][x] = true;

            let perimeter = 0;
            const type = grid[y][x];
            const patch_area = new Set(); // local visited
            patch_area.add(`${x},${y}`);

            // bfs
            const queue = [[x, y]];
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
                            visited[dy][dx] = true;
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
    const rows = grid.length;
    const cols = grid[0].length;
    const is_oob = (x, y) => x < 0 || y < 0 || x >= cols || y >= rows;
    return {
        grid,
        cols,
        rows,
        is_oob,
    };
}

export function part2(data) {
    const { grid, cols, rows, is_oob } = parse(data);
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let total_price = 0;

    // find all 'not visited' patches
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const name = `${x},${y}`;
            if (visited[y][x]) continue;

            // found new area
            visited[y][x] = true;
			
            const edge_map = new Map();
            const type = grid[y][x];
            const patch_area = new Set();
            patch_area.add(`${x},${y}`);
			
			// bfs
            const queue = [[x, y]];
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
                            visited[dy][dx] = true;
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
