export function part1(data) {
    const grid = data
        .trim()
        .split('\n')
        .map((row) => row.split(''));

    const grid_width = grid[0].length;
    const grid_height = grid.length;
    const antenna_grid = Array.from({ length: grid_height }, () =>
        Array.from({ length: grid_width }, () => '.')
    );

    // const already_visited = new Set(['.']);

    // iterate over grid
    for (let y = 0; y < grid_height; y++) {
        for (let x = 0; x < grid_width; x++) {
            const node = grid[y][x];
            // if (already_visited.has(node)) continue; // geht nicht wegen window
            if (node === '.') continue;

            // search the grid for the same node
            // search window should be half the distance from each edge
            // if the node is found, calculate antinode
            const wx_start = Math.ceil(x / 2);
            const wx_end = Math.floor((grid_width - x) / 2) + x;
            const wy_start = Math.ceil(y / 2);
            const wy_end = Math.floor((grid_height - y) / 2) + y;

            // window weiter optimieren, schaut zu weit
            for (let wy = wy_start; wy <= wy_end; wy++) {
                for (let wx = wx_start; wx <= wx_end; wx++) {
                    const n = grid[wy][wx];
                    if (n !== node) continue;

                    const dx = Math.abs(wx - x);
                    const dy = Math.abs(wy - y);
                    // check if you found yourself
                    if (dx === 0 && dy === 0) continue;

                    // aus sicht von x,y
                    const x0 = x < wx ? x - dx : x + dx;
                    const y0 = y < wy ? y - dy : y + dy;
                    // aus sicht von wx,wy
                    const x1 = x < wx ? wx + dx : wx - dx;
                    const y1 = y < wy ? wy + dy : wy - dy;

                    // check if inbounds
                    if (x0 >= 0 && x0 < grid_width && y0 >= 0 && y0 < grid_height) {
                        antenna_grid[y0][x0] = '#';
                    }
                    if (x1 >= 0 && x1 < grid_width && y1 >= 0 && y1 < grid_height) {
                        antenna_grid[y1][x1] = '#';
                    }
                }
            }
        }
    }

    return antenna_grid
        .map((row) => row.filter((node) => node === '#').length)
        .reduce((a, b) => a + b, 0);
}

export function part2(data) {
    return -1;
}
