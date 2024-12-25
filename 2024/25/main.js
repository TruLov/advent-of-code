export function part1(data) {
    const { keys, locks } = parse(data);

    let result = 0;
    for (const lock of locks) {
        for (const key of keys) {
            let fits = true;
            for (let i = 0; i < lock.length; i++) {
                if (lock[i] + key[i] > 5) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                result++;
            }
        }
    }
    return result;
}

export function part2(data) {
    return -1;
}

function parse(data) {
    return data
        .trim()
        .split('\n\n')
        .map((x) => x.split('\n'))
        .reduce(
            (acc, x) => {
                if (x[0] === '#####') {
                    const columns = x.slice(1).map((y) => y.split(''));
                    const columnCount = columns[0].map(
                        (_, i) => columns.map((y) => y[i]).filter((y) => y === '#').length
                    );
                    acc.keys.push(columnCount);
                } else {
                    const columns = x.slice(0, -1).map((y) => y.split(''));
                    const columnCount = columns[0].map(
                        (_, i) => columns.map((y) => y[i]).filter((y) => y === '#').length
                    );
                    acc.locks.push(columnCount);
                }
                return acc;
            },
            { keys: [], locks: [] }
        );
}
