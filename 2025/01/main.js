export function part1(data) {
  const rotations = parse(data);

  let dial = 50;
  let result = 0;

  for (const [direction, distance] of rotations) {
    dial += direction * distance;
    if (dial % 100 == 0) result++;
  }
  return result;
}

export function part2(data) {
  const rotations = parse(data);
  let dial = 50;
  let result = 0;

  for (const [direction, distance] of rotations) {
    const new_dial = dial + direction * distance;

    const count =
      direction > 0
        ? Math.floor(new_dial / 100) - Math.floor(dial / 100)
        : Math.ceil(dial / 100) - Math.ceil(new_dial / 100);
    result += count;

    dial = new_dial;
  }

  return result;
}

function parse(data) {
  const rotations = data
    .trim()
    .split("\n")
    .map((l) => [l[0] == "L" ? -1 : 1, parseInt(l.slice(1))]);
  return rotations;
}

function modulo(num) {
  return ((num % 100) + 100) % 100;
}

export function part1b(data) {
  return data
    .trim()
    .split("\n")
    .map((l) => [l[0] == "L" ? -1 : 1, l.slice(1)])
    .reduce(
      (acc, [dir, val]) => {
        const newDial = acc.dial + dir * val;
        return {
          dial: newDial,
          count: acc.count + (newDial % 100 === 0 ? 1 : 0),
        };
      },
      { dial: 50, count: 0 }
    ).count;
}
