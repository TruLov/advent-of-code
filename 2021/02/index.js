export function part1(data) {
  let depth = 0;
  let position = 0;

  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const [command, value] = lines[i].split(" ");
    const num = parseInt(value);

    switch (command) {
      case "forward":
        position += num;
        break;
      case "up":
        depth -= num;
        break;
      case "down":
        depth += num;
        break;
    }
  }

  return depth * position;
}

export function part2(data) {
  let depth = 0;
  let position = 0;
  let aim = 0;

  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const [command, value] = lines[i].split(" ");
    const num = parseInt(value);

    switch (command) {
      case "forward":
        position += num;
        depth += aim * num;
        break;
      case "up":
        aim -= num;
        break;
      case "down":
        aim += num;
        break;
    }
  }

  return depth * position;
}
