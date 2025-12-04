export function part1(data) {
  const banks = parse(data);

  const result = [];
  for (const bank of banks) {
    const n = bank.length;
    const max_suffix = new Array(n).fill(-1);

    for (let i = n - 2; i >= 0; i--) {
      max_suffix[i] = Math.max(bank[i + 1], max_suffix[i + 1]);
    }

    let best = -1;
    for (let i = 0; i < n - 1; i++) {
      const prefix = bank[i] * 10 + max_suffix[i];
      if (prefix > best) best = prefix;
    }

    result.push(best);
  }

  return result.reduce((a, b) => a + b);
}

export function part2(data) {
  const banks = parse(data);
  const number_of_picks = 12;

  let start = 0;
  const result = [];

  for (const bank of banks) {
    const n = bank.length;
    let start_idx = 0;

    let pick_result = [];

    for (let pick = 0; pick < number_of_picks; pick++) {
      const remaining_picks = number_of_picks - pick - 1;
      const end_idx = n - remaining_picks - 1;

      let best = -Infinity;
      let best_idx = start_idx;
      for (let i = start_idx; i <= end_idx; i++) {
        if (bank[i] > best) {
          best = bank[i];
          best_idx = i;
        }
      }

      pick_result.push(best);
      start_idx = best_idx + 1;
    }
    const r = Number(pick_result.join(""));
    result.push(r);
  }

  return result.reduce((a, b) => a + b);
}

function parse(data) {
  return data
    .trim()
    .split("\n")
    .map((s) => s.split("").map(Number));
}
