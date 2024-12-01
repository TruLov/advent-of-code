export function part1(data) {
    let floor = 0;

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element === '(') {
            floor++;
        } else {
            floor--;
        }
    }

    return floor;
}

export function part2(data) {
    let floor = 0;

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element === '(') {
            ++floor;
        } else {
            --floor;
        }
        if (floor < 0) {
            return i + 1;
        }
    }
}
