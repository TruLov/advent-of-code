const mix = (n, m) => n ^ m;
const prune = (n) => n % 16777216n;
const step1 = (n) => prune(mix(n, n * 64n));
const step2 = (n) => prune(mix(n, BigInt(Math.floor(Number(n / 32n)))));
const step3 = (n) => prune(mix(n, n * 2048n));

const gen_secret = (i) => step3(step2(step1(BigInt(i))));

export function part1(data) {
    const lines = data.trim().split('\n').map(Number);
    let result = 0n;
    for (let line of lines) {
        let secret = line;
        for (let i = 0; i < 2000; i++) {
            secret = gen_secret(secret);
        }
        result += secret;
    }

    return Number(result);
}

export function part2(data) {
    const lines = data.trim().split('\n').map(Number);

    const decision_map = new Map();

    lines.forEach((line, line_count) => {
        let secret = line;
        let bananas = line % 10;

        // build list of changes
        const list = [];
        for (let i = 1; i < 2000; i++) {
            secret = gen_secret(secret);
            const bananas_new = Number(secret % 10n);
            const diff = bananas_new - bananas;
            list.push([bananas_new, diff]);
            bananas = bananas_new;
        }

        // build decision map with the last 4 diffs
        for (let i = 0; i < list.length - 4; i++) {
            const frame = list.slice(i, i + 4);
            const key = frame.map(([_, diff]) => diff).join(',');
            const value = frame.slice(-1)[0][0];

            if (!decision_map.has(key)) {
                decision_map.set(key, `${value}`);
            } else if (decision_map.get(key).length < line_count + 1) {
                decision_map.set(
                    key,
                    `${value}` + `${decision_map.get(key)}`.padStart(line_count, '0')
                );
            }
        }
    });

    // berechne für jeden map value die Quersumme und sortiere danach
    decision_map.forEach((value, key) => {
        const quersumme = value.split('').reduce((acc, curr) => acc + Number(curr), 0);
        decision_map.set(key, quersumme);
    });
    // sort the map by value
    const sorted = [...decision_map.entries()].sort((a, b) => a[1] - b[1]);

    return sorted.pop()[1];
}
