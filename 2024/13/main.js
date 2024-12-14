export function part1(data) {
    const machines = parse(data);
    return machines
        .map(({ a, b, p }) => {
            let min_pushes = Infinity;
            let amin = 0;
            let bmin = 0;

            // brute force
            for (let i = 0; i < 100; i++) {
                for (let j = 0; j < 100; j++) {
                    const x = i * a[0] + j * b[0];
                    const y = i * a[1] + j * b[1];
                    if (x === p[0] && y === p[1]) {
                        const push_count = i + j;
                        if (push_count < min_pushes) {
                            min_pushes = push_count;
                            amin = i;
                            bmin = j;
                        }
                    }
                }
            }
            return amin * 3 + bmin;
        })
        .reduce((a, b) => a + b, 0);
}

function parse(data, factor = 1) {
    const machines_str = data
        .trim()
        .split('\n\n')
        .map((m) => m.split('\n'));

    return machines_str.map((m) => {
        const a = m[0].substring(12).split(', Y+').map(Number);
        const b = m[1].substring(12).split(', Y+').map(Number);
        const p = m[2]
            .substring(9)
            .split(', Y=')
            .map((n) => Number(n) * factor);

        return { a, b, p };
    });
}

