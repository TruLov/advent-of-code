export function part1(data) {
  let count = 0;
  const nums = data.split("\n").map(Number);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) count++;
  }

  return count;
}

export function part2(data) {
  let count = 0;
  const nums = data.split("\n").map(Number);

  for (let i = 1; i < nums.length - 2; i++) {
    if (
      nums[i] + nums[i + 1] + nums[i + 2] >
      nums[i - 1] + nums[i] + nums[i + 1]
    )
      count++;
  }

  return count;
}
