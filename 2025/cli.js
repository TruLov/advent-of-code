#!/usr/bin/env node
import path from "path";
import { readFileSync } from "fs";
import { pathToFileURL } from "url";

const folder = process.argv[2];
if (!folder) {
  console.error("Fehlender Ordnername.");
  process.exit(1);
}

const inputPath = path.join(folder, "input.txt");
const data = readFileSync(inputPath, "utf8");

const modulePath = pathToFileURL(path.join(folder, "main.js")).href;
const { part1, part2 } = await import(modulePath);

console.log("part1:", part1(data));
console.log("part2:", part2(data));
