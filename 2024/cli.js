import { Command } from 'commander';
import { dirname, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { warmup_jit, iqr_bench, measureMemoryNodeWithGC } from './utils/bench.js';

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
    .name('aoc')
    .description('Run Advent of Code solutions')
    .version('1.0.0')
    .argument('<day>', 'Day of Advent of Code to run (1-25)')
    .action(async (day_arg) => {
        const { day, day_path } = parse_day_arg(day_arg);
        const { module, input } = await read_day(day_path);

        try {
            if (typeof module.part1 === 'function' && typeof module.part2 === 'function') {
                const result1 = module.part1(input);
                console.log(`${result1}`);
                const result2 = module.part2(input);
                console.log(`${result2}`);
            } else {
                program.error(`Day ${day} must export two functions: 'part1' and 'part2'.`);
            }
        } catch (err) {
            program.error(`Failed to run Day ${day}: ${err.message}`, {
                exitCode: 1,
                code: 'aoc.runtime_error',
            });
        }
    })
    .command('bench <day>')
    .description('Benchmark Advent of Code solutions')
    .action(async (day_arg) => {
        const { day, day_path } = parse_day_arg(day_arg);
        const { module, input } = await read_day(day_path);

        console.log(`Starting benchmarks for Day ${day}...`);

        if (typeof module.part1 === 'function' && typeof module.part2 === 'function') {
            console.log('Warmup JIT...');
            warmup_jit(module.part1, 3, input);
            
            const iterations = 10;
            console.log('\nStarting benchmarks...');
            const result1_iqr = iqr_bench(iterations, module.part1, input);
            console.log(`iqr bench part 1:    ${result1_iqr} ms`);
            const result2_iqr = iqr_bench(iterations, module.part2, input);
            console.log(`iqr bench part 2:    ${result2_iqr} ms`);

            // console.log('\nStarting memory benchmarks...');
            // const result1_mem = measureMemoryNodeWithGC(module.part1, input);
            // console.log(`Memory part 1:       ${result1_mem} kB`);
            // const result2_mem = measureMemoryNodeWithGC(module.part2, input);
            // console.log(`Memory part 2:       ${result2_mem} kB`);
            

        } else {
            program.error(`Day ${day} must export two functions: 'part1' and 'part2'.`);
        }
    });

program.parse(process.argv);

function parse_day_arg(day_arg) {
    const day_int = parseInt(day_arg);
    if (isNaN(day_int) || day_int < 1 || day_int > 25) {
        program.error('Invalid day. Please provide a number between 1 and 25.', {
            exitCode: 1,
            code: 'aoc.invalid_argument',
        });
    }

    const day = day_int.toString().padStart(2, '0');
    const day_path = join(__dirname, day);

    if (!fs.existsSync(day_path)) {
        program.error(`Day ${day} does not exist`, {
            exitCode: 1,
            code: 'aoc.file_not_found',
        });
    }

    return { day, day_path };
}

async function read_day(day_path) {
    try {
        const input = read_input_data(day_path);
        const module_path = join(day_path, 'main.js');
        const module = await import(module_path);
        return { module, input };
    } catch (e) {
        program.error(`Failed to read inputs for path ${day_path}/'main.js': ${e.message}`, {
            exitCode: 1,
            code: 'aoc.runtime_error',
        });
    }
}

function read_input_data(day_path) {
    const input_path = join(day_path, 'input.txt');
    if (fs.existsSync(input_path)) {
        return fs.readFileSync(input_path, 'utf-8');
    } else {
        program.error(`Input file ${day_path}/'input.txt' is missing.`, {
            exitCode: 1,
            code: 'aoc.file_not_found',
        });
    }
}
