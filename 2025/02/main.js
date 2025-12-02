export function part1(data) {
  const count_digits = (n) => Math.floor(Math.log10(Math.abs(n))) + 1;

  const result = parse(data)
    .filter((n) => count_digits(n) % 2 === 0)
    .map((n) => {
      const divisor = 10 ** (count_digits(n) / 2);
      return [Math.floor(n / divisor), n % divisor];
    })
    .filter(([left, right]) => left === right)
    .reduce(
      (sum, [left, right]) => sum + left * 10 ** count_digits(right) + right,
      0
    );

  return result;
}

export function part2(data) {
  const numbers = parse(data);
  return numbers
    .filter((n) => is_repeating_pattern(String(n)))
    .reduce((sum, n) => sum + n, 0);
}

function is_repeating_pattern(s) {
  const n = s.length;
  if (n <= 1) return false;

  // helper array to store longest matching pattern
  const sequence_checker_arr = new Array(n).fill(0);

  // move foreward right_idx
  for (let right_idx = 1; right_idx < n; right_idx++) {
    // increases if found repeating pattern
    let left_idx = sequence_checker_arr[right_idx - 1];

    // if you have a mismatch, send back left_idx to last match
    while (left_idx > 0 && s[right_idx] !== s[left_idx]) {
      left_idx = sequence_checker_arr[left_idx - 1];
    }

    // else, increase left_idx
    if (s[right_idx] === s[left_idx]) {
      left_idx++;
    }

    // store found pattern in helper array
    sequence_checker_arr[right_idx] = left_idx;
  }

  const longest_pattern_len = sequence_checker_arr[n - 1];
  const smallest_repeating_pattern = n - longest_pattern_len;

  const is_pattern =
    smallest_repeating_pattern < n && n % smallest_repeating_pattern === 0;
  return is_pattern;
}

function parse(data) {
  return data
    .trim()
    .split(",")
    .map((x) => x.split("-").map(Number))
    .flatMap(([from, to]) => [...Array(to - from + 1)].map((_, i) => i + from));
}
