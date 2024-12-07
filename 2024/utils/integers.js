export function concatenate(a, b) {
    return a * Math.pow(10, Math.floor(Math.log10(b) + 1)) + b;
}
