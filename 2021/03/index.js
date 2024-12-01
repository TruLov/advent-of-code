export function part1(data) {
  const lines = data.split("\n");
  const result = powerConsumption(lines);
  return result;
}

export function part2(data) {
  const lines = data.split("\n");
  const result = lifeSupportRating(lines);
  return result;
}

function lifeSupportRating(diagnosticReport) {
  const maxIterations = diagnosticReport[0].length;

  let o2gen = diagnosticReport;
  let co2scrubber = diagnosticReport;

  // calulate o2 generator rating
  for (let i = 0; i < maxIterations; i++) {
    // stop if value found
    if (o2gen.length <= 1) break;

    // select bit criteria for current iteration
    let transposed = transpose(o2gen.map((s) => [...s]));
    let bitCriteria = mostCommon(transposed[i]);

    // filter lines that do not match the bit citeria
    o2gen = o2gen.filter((line) => line[i] == bitCriteria);
  }

  for (let i = 0; i < maxIterations; i++) {
    // stop if value found
    if (co2scrubber.length <= 1) break;

    // select bit criteria for current iteration
    let transposed = transpose(co2scrubber.map((s) => [...s]));
    let bitCriteria = leastCommon(transposed[i]);

    // filter lines that do not match the bit citeria
    co2scrubber = co2scrubber.filter((line) => line[i] == bitCriteria);
  }

  // calculate co2 scrubber rating
  const o2GeneratorRating = parseInt(o2gen[0], 2);
  const o2ScrubberRating = parseInt(co2scrubber[0], 2);

  console.info("[INFO] o2GeneratorRating: " + o2GeneratorRating);
  console.info("[INFO] o2ScrubberRating: " + o2ScrubberRating);

  return o2GeneratorRating * o2ScrubberRating;
}

function powerConsumption(diagnosticReport) {
  const transposedMatrix = transpose(diagnosticReport.map((s) => [...s]));
  const gamma = gammaRate(transposedMatrix).join("");
  const epsilon = epsiloneRate(transposedMatrix).join("");
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function gammaRate(matrix) {
  return matrix.map((x) => mostCommon(x));
}

function epsiloneRate(matrix) {
  return matrix.map((x) => leastCommon(x));
}

function transpose(arr) {
  return arr[0].map((_, i) => arr.map((x) => x[i]));
}

function mostCommon(str) {
  const obj = { 0: 0, 1: 0 };
  [...str].forEach((c) => (obj[c] += 1 || 1));
  return obj[1] >= obj[0] ? 1 : 0;
}

function leastCommon(str) {
  const obj = { 0: 0, 1: 0 };
  [...str].forEach((c) => (obj[c] += 1 || 1));
  return obj[0] <= obj[1] ? 0 : 1;
}
