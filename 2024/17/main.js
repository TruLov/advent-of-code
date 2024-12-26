export function part1(data) {
    const [r, p] = data.trim().split('\n\n');
    const [a, b, c] = r
        .split('\n')
        .map((x) => x.split(': ')[1])
        .map(Number);
    const program = p.split(': ')[1].split(',').map(Number);

    return evaluate(a, b, c, program);
}

export function part2(data) {
    const [r, p] = data.trim().split('\n\n');
    const [_, b, c] = r
        .split('\n')
        .map((x) => x.split(': ')[1])
        .map(Number);
    const program = p.split(': ')[1].split(',').map(Number);

    const recursive_reverse_engineering = (program, instruction_pointer, counter) => {
        for (let i = 0; i < 8; i++) {
            // Try the current candidate value of `a`
            const a = counter * 8 + i;
            const output = evaluate(a, b, c, program);

            // If output matches the current program slice
            if (output === program.slice(instruction_pointer).join(',')) {
                // found solution
                if (instruction_pointer === 0) return a;

                // move instruction pointer 1 back
                const ret = recursive_reverse_engineering(program, instruction_pointer - 1, a);
                // valid partial solution found
                if (ret !== null) return ret;
            }
        }

        // no valid part of solution
        return null;
    };

    return recursive_reverse_engineering(program, program.length - 1, 0);
}

function evaluate(a, b, c, program) {
    const combo = (op) => {
        if (op === 6) return c;
        if (op === 5) return b;
        if (op === 4) return a;
        return op;
    };
    const stdout = [];
    const instructions = {
        // 0: (op) => (a = a >> combo(op)),
		// ???
        0: (op) => (a = Math.floor(a / 2 ** combo(op))),
        1: (op) => (b ^= op),
        2: (op) => (b = combo(op) & 7),
        3: (op) => a !== 0 && (i = op - 2),
        4: () => (b ^= c),
        5: (op) => stdout.push(combo(op) & 7),
        6: (op) => (b = a >> combo(op)),
        7: (op) => (c = a >> combo(op)),
    };

    let i = 0;
    while (i < program.length) {
        const [opcode, operand] = program.slice(i, i + 2);
        instructions[opcode](operand);
        i += 2;
    }

    return stdout.join(','); 
}