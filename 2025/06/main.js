export function part1(data) {
  const raw = data
    .trim()
    .split("\n")
    .map((row) =>
      row
        .trim()
        .split(" ")
        .filter((x) => x)
    );
  const ops = raw.pop();
  const probs = raw.map((row) => row.map(Number));

  const n = ops.length;

  let result = 0;
  for (let i = 0; i < n; i++) {
    switch (ops[i]) {
      case "+":
        result += probs.map((x) => x[i]).reduce((a, b) => a + b, 0);
        break;
      case "*":
        result += probs.map((x) => x[i]).reduce((a, b) => a * b, 1);
        break;
    }
  }

  return result;
}

function calc(nums, o) {
  switch (o) {
    case "+":
      return nums
        .filter((x) => x)
        .map(Number)
        .reduceRight((a, b) => a + b, 0);
    case "*":
      return nums
        .filter((x) => x)
        .map(Number)
        .reduceRight((a, b) => a * b, 1);
    default:
      return 0;
  }
}

export function part2(data) {
  const rows = data.split("\n").filter((x) => x);
  const operations = rows.pop();
  const n = rows[0].length;

  let operation;
  let nums = [];
  let result = 0;

  for (let i = 0; i < n; i++) {
    const o = operations[i];
    if (o !== " ") {
      const r = calc(nums, operation);
      result += r;
      operation = o;
      nums = [];
    }

    nums.push(
      rows
        .map((r) => r[i].trim())
        .filter((x) => x)
        .map(Number)
        .join("")
    );
  }
  const r = calc(nums, operation);
  result += r;
  return result;
}
