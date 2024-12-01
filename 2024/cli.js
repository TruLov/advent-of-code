import { Command } from "commander";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// import pkg from "./package.json" with { type: "json" };

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read_input_data = (day) => {
  const input_path = join(__dirname, day, "input.txt");
  if (fs.existsSync(input_path)) {
    return fs.readFileSync(input_path, "utf-8"); // Read the file as a string
  } else {
    console.error(`Input file for Day ${day} is missing.`);
    process.exit(1);
  }
};

program
  .name("aoc")
  .description("Run Advent of Code solutions")
  .version("1.0.0")
  // .version(pkg.version)
  .argument("<day>", "Day of Advent of Code to run (1-25)")
  .action(async (dayArg) => {
    const dayNumber = parseInt(dayArg, 10);
    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
      console.error("Invalid day. Please provide a number between 1 and 25.");
      process.exit(1);
    }

    const day = dayNumber.toString().padStart(2, "0");
    const day_path = join(__dirname, day, "main.js");

    if (!fs.existsSync(day_path)) {
      console.error(
        `Day ${day} does not exist or is missing an main.js file.`
      );
      process.exit(1);
    }

    try {
      const day_module = await import(day_path);
      const input_data = read_input_data(day);

      if (
        typeof day_module.part1 === "function" &&
        typeof day_module.part2 === "function"
      ) {
        const result1 = day_module.part1(input_data);
        console.log(`${result1}`);

        const result2 = day_module.part2(input_data);
        console.log(`${result2}`);
      } else {
        console.error(
          `Day ${day} must export two functions: 'part1' and 'part2'.`
        );
      }
    } catch (err) {
      console.error(`Failed to run Day ${day}:`, err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

