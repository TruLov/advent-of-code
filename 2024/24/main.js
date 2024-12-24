export function part1(data) {
    const { start, connections } = parse(data);

    const evaluate = (a, b, op) => {
        if (a === null || b === null) return null;
        switch (op) {
            case 'AND':
                return a & b;
            case 'OR':
                return a | b;
            case 'XOR':
                return a ^ b;
        }
    };

    const calculateState = (key) => {
        if (state.get(key) !== null) return state.get(key);

        const { a, b, o } = connections.get(key);
        const valueA = calculateState(a);
        const valueB = calculateState(b);

        const result = evaluate(valueA, valueB, o);
        state.set(key, result);
        return result;
    };

    const state = new Map();
    start.forEach((x) => state.set(x.s, x.n));
    connections.keys().forEach((c) => state.set(c, null));

    const zs = [...state.keys()].filter((k) => k.startsWith('z'));
    zs.forEach((z) => calculateState(z));

    const result = zs
        .sort((a, b) => a.localeCompare(b))
        .map((s) => state.get(s))
        .reverse()
        .join('');

    return parseInt(result, 2);
}

export function part2(data) {
    return -1;
}

function parse(data) {
    const [start_raw, connections_raw] = data.trim().split('\n\n');

    const start = start_raw.split('\n').map((x) => {
        const [s, n] = x.split(': ');
        return { s: s, n: n };
    });

    const connections = new Map();
    connections_raw.split('\n').map((s) => {
        const [z, t] = s.split(' -> ');
        const [a, o, b] = z.split(' ');

        connections.set(t, { a, o, b });
    });

    return { start, connections };
}
