const ADJ = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  //   { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

export function part1(data) {
  const map = data
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  const width = map[0].length;
  const height = map.length;

  const check_adj = (x, y) =>
    x < 0 || y < 0 || x >= width || y >= height
      ? false
      : map[y][x] === "@" || map[y][x] === "X";

  let result = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] !== "@") continue;
      let count_adj = 0;
      for (const d of ADJ) {
        if (check_adj(x + d.x, y + d.y)) count_adj++;
      }
      if (count_adj < 4) {
        map[y][x] = "X";
        result++;
      }
    }
  }

  return result;
}

export function part2(data) {
  const map = data
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  const width = map[0].length;
  const height = map.length;

  const check_adj = (x, y) =>
    x < 0 || y < 0 || x >= width || y >= height
      ? false
      : map[y][x] === "@" || map[y][x] === "X";

  let result = 0;
  let removed = 0;

  do {
    removed = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] !== "@") continue;
        let count_adj = 0;
        for (const d of ADJ) {
          if (check_adj(x + d.x, y + d.y)) count_adj++;
        }
        if (count_adj < 4) {
          map[y][x] = "X";
          removed++;
        }
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] === "X") map[y][x] = ".";
      }
    }
    result += removed;
  } while (removed > 0);

  return result;
}
