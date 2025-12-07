export function part1(data) {
  let rows = data.trim().split("\n");
  const n = rows.length;
  const s = rows[0].indexOf("S");

  const next_manifold_in_col = (x, y) => {
    for (let dy = y; dy < n; dy++) {
      if (rows[dy][x] === "^") return dy;
    }
    return -1;
  };

  const key = (x, y) => `${x}-${y}`;

  const visited = new Set();

  const count_from = (x, y) => {
    const dy = next_manifold_in_col(x, y);
    if (dy === -1) return 0;

    const k = key(x, dy);
    if (visited.has(k)) return 0;
    visited.add(k);

    const left = count_from(x - 1, dy + 1);
    const right = count_from(x + 1, dy + 1);
    const total = left + right + 1;
    return total;
  };

  return count_from(s, 1);
}

export function part2(data) {
  const rows = data.trim().split("\n");
  const n = rows.length;
  const s = rows[0].indexOf("S");

  const next_manifold_in_col = (x, y) => {
    for (let dy = y; dy < n; dy++) {
      if (rows[dy][x] === "^") return dy;
    }
    return -1;
  };

  const key = (x, y) => `${x}-${y}`;

  const memo = new Map();

  const count_from = (x, y) => {
    const k = key(x, y);
    if (memo.has(k)) return memo.get(k);

    const dy = next_manifold_in_col(x, y);
    if (dy === -1) {
      memo.set(k, 1n);
      return 1n;
    }

    const left = count_from(x - 1, dy + 1);
    const right = count_from(x + 1, dy + 1);
    const total = left + right;
    memo.set(k, total);
    return total;
  };

  return count_from(s, 1);
}
