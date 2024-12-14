export function part1(data) {
    const machines = parse(data);

    // a * ax + b * bx = px
    // a * ay + b * by = py
    const min_button_presses = machines.map(({ a: [ax, ay], b: [bx, by], p: [px, py] }) => {
        const b = (ax * py - ay * px) / (ax * by - ay * bx);
        const a = (px - b * bx) / ax;

        if (a > 100 || b > 100) return 0;
        if (!Number.isInteger(a) || !Number.isInteger(b)) return 0;
        if (a * ax + b * bx !== px && a * ay + b * by !== py) return 0;

        return a * 3 + b;
    });
    return min_button_presses.reduce((a, b) => a + b, 0);
}

export function part2(data) {
    const machines = parse(data);
    const factor = 10_000_000_000_000;

    const min_button_presses = machines.map(({ a: [ax, ay], b: [bx, by], p: [px, py] }) => {
        px += factor;
        py += factor;
        const b = (ax * py - ay * px) / (ax * by - ay * bx);
        const a = (px - b * bx) / ax;

        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            return 0;
        }
        if (a * ax + b * bx !== px && a * ay + b * by !== py) {
            return 0;
        }

        return a * 3 + b;
    });
    return min_button_presses.reduce((a, b) => a + b, 0);
}

function parse(data) {
    const machines_str = data
        .trim()
        .split('\n\n')
        .map((m) => m.split('\n'));

    return machines_str.map((m) => {
        const a = m[0].substring(12).split(', Y+').map(Number);
        const b = m[1].substring(12).split(', Y+').map(Number);
        const p = m[2].substring(9).split(', Y=').map(Number);

        return { a, b, p };
    });
}
