export function part1(data) {
  const result = parse(data)
    .filter((n) => `${n}`.length % 2 === 0)
    .map((n) => [
      Number(String(n).slice(0, String(n).length / 2)),
      Number(String(n).slice(String(n).length / 2)),
    ])
    .filter(([a, b]) => a === b)
    .map(([a, b]) => Number(`${a}${b}`))
    .reduce((acc, cur) => acc + cur, 0);

  return result;
}

export function part2(data) {
  const numbers = parse(data);
  let pattern_matches = [];
  for (const row of numbers) {
    if (find_repeating_sequence(`${row}`)) {
      pattern_matches.push(row);
    }
  }

  return pattern_matches.reduce((a, b) => a + b, 0);
}

function find_repeating_sequence(s) {
  const str_len = s.length;
  // helper array to store longest matching pattern
  const sequence_checker_arr = new Array(str_len).fill(0);

  // move foreward checker_index
  for (let checker_index = 1; checker_index < str_len; checker_index++) {
    // increases if found repeating pattern
    let pattern_index = sequence_checker_arr[checker_index - 1];

    // if you have a mismatch, send back pattern_index to last match
    while (pattern_index > 0 && s[checker_index] !== s[pattern_index]) {
      pattern_index = sequence_checker_arr[pattern_index - 1];
    }

    // else, increase pattern_index
    if (s[checker_index] === s[pattern_index]) {
      pattern_index++;
    }

    // store found pattern in helper array
    sequence_checker_arr[checker_index] = pattern_index;
  }

  const longest_pattern_len = sequence_checker_arr[str_len - 1];
  const smallest_repeating_pattern = str_len - longest_pattern_len;

  const is_pattern =
    smallest_repeating_pattern < str_len &&
    str_len % smallest_repeating_pattern === 0;
  return is_pattern;
  // if (is_pattern) {
  //   return {
  //     pattern: s.slice(0, smallest_repeating_pattern),
  //     count: str_len / smallest_repeating_pattern,
  //   };
  // }

  // return null;
}

function parse(data) {
  return data
    .trim()
    .split(",")
    .map((x) => x.split("-").map(Number))
    .flatMap(([from, to]) => [...Array(to - from + 1)].map((_, i) => i + from));
}
