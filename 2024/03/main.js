export function part1(data) {
    let sum = 0;
    let parts = data.trim().split('mul(');

    for (let i = 0; i < parts.length; i++) {
        const isValid = /\d+,\d+\).*/.test(parts[i]);

        if (isValid) {
            const groups = parts[i].match(/^(\d+),(\d+)\)/);
            if (!groups || groups.length < 3) {
                continue;
            }
            const a = Number(groups[1]);
            const b = Number(groups[2]);

            // if (!isNaN(a) && !isNaN(b)) {
            sum += a * b;
            // }
        }
    }

    return sum;
}

export function part2(data) {
    let sum = 0;
    const parts = [...data.matchAll(/(mul\((\d+,\d+)\)|do\(\)|don't\(\))/g)];

    let do_it = true;

    for (let i = 0; i < parts.length; i++) {
        const instruction_group = parts[i];
        const instruction = instruction_group[0].substr(0, 3);

        switch (instruction) {
            case 'do(':
                do_it = true;
                continue;

            case 'don':
                do_it = false;
                continue;

            case 'mul':
                if (!do_it) continue;

                const nums = instruction_group[2].split(',');
                const a = Number(nums[0]);
                const b = Number(nums[1]);

                // if (!isNaN(a) && !isNaN(b)) {
                sum += a * b;
                // }
                break;
        }
    }

    return sum;
}
