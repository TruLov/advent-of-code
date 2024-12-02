export function part1(data) {
    return parse(data)
        .map((line) => check_report(line).ok)
        .reduce((acc, val) => acc + (val ? 1 : 0), 0);
}

export function part1_curry(data) {
    const reports = parse(data);

    const diff = (nums) => nums.map((num, i) => num - nums[i + 1]).slice(0, -1);
    const checker = (allowed) => (vals) => vals.reduce((p, c) => p && allowed.includes(c), true);
    const inc = checker([1, 2, 3]);
    const dec = checker([-1, -2, -3]);
    const is_safe = (diff) => (checker1, checker2) => checker1(diff) || checker2(diff);

    return reports
        .map((report) => is_safe(diff(report))(inc, dec))
        .reduce((acc, val) => acc + (val ? 1 : 0), 0);
}

export function part1_sets(data) {
    const lines = parse(data);

    let result = 0;
    for (let i = 0; i < lines.length; i++) {
        const safe_incline = new Set([1, 2, 3]);
        const safe_decline = new Set([-1, -2, -3]);
        const line = lines[i];

        for (let j = 1; j < line.length; j++) {
            const elevation = line[j] - line[j - 1];
            safe_incline.add(elevation);
            safe_decline.add(elevation);
        }

        if (safe_incline.size === 3 || safe_decline.size === 3) result++;
    }

    return result;
}

export function part2(data) {
    return parse(data)
        .map((line) => ({ ...check_report(line), line }))
        .map(({ ok, level, line }) => ok || check_damped_report(line, level).ok)
        .reduce((acc, val) => acc + (val ? 1 : 0), 0);
}

function check_damped_report(levels, level) {
    const left = safe_splice(levels, level - 2);
    if (check_report(left).ok) {
        return { ok: true, level: level - 2 };
    }

    const mid = safe_splice(levels, level - 1);
    if (check_report(mid).ok) {
        return { ok: true, level: level - 1 };
    }

    const right = safe_splice(levels, level);
    if (check_report(right).ok) {
        return { ok: true, level: level };
    }

    return { ok: false };
}

function check_damped_report_brute(levels) {
    for (let i = 0; i < levels.length; i++) {
        const adjusted_report = safe_splice(levels, i);
        if (check_report(adjusted_report).ok) {
            return { ok: true, level: i };
        }
    }
    return { ok: false };
}

function safe_splice(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function check_report(levels) {
    let last_elevation = levels[1] - levels[0];
    let max_abs = 0;

    for (let i = 1; i < levels.length; i++) {
        const elevation = levels[i] - levels[i - 1];
        const abs = Math.abs(elevation);
        max_abs = Math.max(max_abs, abs);

        if (sign_changed(last_elevation, elevation) || abs === 0 || max_abs > 3) {
            return { ok: false, level: i };
        }
    }
    return { ok: true, level: -1 };
}

function sign_changed(a, b) {
    return (a < 0 && b >= 0) || (a >= 0 && b < 0);
}

function parse(data) {
    return data
        .trim()
        .split('\n')
        .map((line) => line.split(' ').map(Number));
}
