const add = (a, b) => a + b;
const mul = (a, b) => a * b;
const con = (a, b) => parseInt(`${a}${b}`);

export function part1(data) {
    return parseInput(data)
        .filter(({ nums, res }) => is_safe(nums, res, [add, mul]))
        .reduce((acc, { res }) => acc + res, 0);
}

export function part2(data) {
    return parseInput(data)
        .filter(({ nums, res }) => is_safe(nums, res, [add, mul, con]))
        .reduce((acc, { res }) => acc + res, 0);
}

const is_safe = (nums, res, ops, i = 0, current = nums[0]) => {
    if (i === nums.length - 1) return current === res;
    return ops.some((op) => is_safe(nums, res, ops, i + 1, op(current, nums[i + 1])));
};

// const is_safe2 = (nums, res, i = 0, current = nums[0]) => {
//     if (i === nums.length - 1) return current === res;
//     const next = nums[i + 1];
//     return (
//         is_safe2(nums, res, i + 1, current + next) ||
//         is_safe2(nums, res, i + 1, current * next) ||
//         is_safe2(nums, res, i + 1, parseInt(`${current}${next}`))
//     );
// };

function parseInput(data) {
    return data
        .trim()
        .split('\n')
        .map((line) => {
            const [res_raw, nums_raw] = line.split(':');
            return {
                res: parseInt(res_raw.trim()),
                nums: nums_raw.trim().split(' ').map(Number),
            };
        });
}
