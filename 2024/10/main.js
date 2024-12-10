export function part1(data) {
    const grid = parse(data);

    return grid.reduce((total, row, y) => {
        const result_row = row
            .map((cell, x) => (cell === 0 ? dfs(y, x, grid) : 0))
            .reduce((sum, trail_count) => sum + trail_count, 0);
        return total + result_row;
    }, 0);
}

export function part2(data) {
    const grid = parse(data);
    return grid.reduce((total, row, y) => {
        const result_row = row
            .map((cell, x) => (cell === 0 ? dfs2(y, x, grid).length : 0))
            .reduce((sum, trail_count) => sum + trail_count, 0);
        return total + result_row;
    }, 0);
}

function dfs2(y, x, grid, visited = new Set()) {
    const value = grid[y][x];
    visited.add(`${y},${x}`);

    if (value === 9) {
        return [visited];
    }
    let trails = [];

    // check down
    if (y < grid.length - 1 && grid[y + 1][x] === value + 1 && !visited.has(`${y + 1},${x}`)) {
        trails.push(...dfs2(y + 1, x, grid, new Set(visited)));
    }
    // check up
    if (y > 0 && grid[y - 1][x] === value + 1 && !visited.has(`${y - 1},${x}`)) {
        trails.push(...dfs2(y - 1, x, grid, new Set(visited)));
    }
    // check right
    if (x < grid[y].length - 1 && grid[y][x + 1] === value + 1 && !visited.has(`${y},${x + 1}`)) {
        trails.push(...dfs2(y, x + 1, grid, new Set(visited)));
    }
    // check left
    if (x > 0 && grid[y][x - 1] === value + 1 && !visited.has(`${y},${x - 1}`)) {
        trails.push(...dfs2(y, x - 1, grid, new Set(visited)));
    }

    return trails;
}

function dfs(y, x, grid, visited = new Set()) {
    const value = grid[y][x];
    visited.add(`${y},${x}`);
    if (value === 9) {
        return 1;
    }

    let result = 0;

    // check down
    if (y < grid.length - 1 && grid[y + 1][x] === value + 1 && !visited.has(`${y + 1},${x}`)) {
        result += dfs(y + 1, x, grid, visited);
    }
    // check up
    if (y > 0 && grid[y - 1][x] === value + 1 && !visited.has(`${y - 1},${x}`)) {
        result += dfs(y - 1, x, grid, visited);
    }
    // check right
    if (x < grid[y].length - 1 && grid[y][x + 1] === value + 1 && !visited.has(`${y},${x + 1}`)) {
        result += dfs(y, x + 1, grid, visited);
    }
    // check left
    if (x > 0 && grid[y][x - 1] === value + 1 && !visited.has(`${y},${x - 1}`)) {
        result += dfs(y, x - 1, grid, visited);
    }

    return result;
}

function parse(data) {
    const grid = data
        .trim()
        .split('\n')
        .map((row) => row.split('').map(Number));
    return grid;
}
