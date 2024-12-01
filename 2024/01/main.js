export function part1(data) {
    const { a, b } = parse(data);

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result += Math.abs(a[i] - b[i]);
    }

    return result;
}

export function part2(data) {
    const { a, b } = parse(data);

    const b_counts = b.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        const num = a[i];
        const count = b_counts[num];
        result += num * (count ?? 0);
    }

    return result;
}

function parse(data) {
    const lines = data.split('\n').filter((x) => x);
    const pairs = lines.map((line) => line.split(/\s+/).map(Number));

    const a = pairs.map((pair) => pair[0]).sort((a, b) => a - b);
    const b = pairs.map((pair) => pair[1]).sort((a, b) => a - b);

    return { a, b };
}
