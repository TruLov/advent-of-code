export function part1(data) {
    const { rules, pages } = parse(data);

    let result = 0;

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const is_in_order = check_page(rules, page);
        if (is_in_order) {
            result += get_single_result(page);
        }
    }
    return result;
}

export function part2(data) {
    const { rules, pages } = parse(data);

    let result = 0;

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const is_in_order = check_page(rules, page);
        if (!is_in_order) {
			const new_page = correct_page(rules, page);
            result += get_single_result(new_page);
        }
    }
    return result;
}

function correct_page(rules, page) {
	let new_page = page.slice();

	for (let i = new_page.length - 1; i > 0; i--) {
		const current_rule = rules[new_page[i]];
		if (!current_rule) continue;

		for (let j = i - 1; j >= 0; j--) {
			if (current_rule.includes(new_page[j])) {
				const temp = new_page[j];
				new_page[j] = new_page[i];
				new_page[i] = temp;
				i++;
				break;
			}
		}
	}
	return new_page
}

function get_single_result(page) {
	const l = page.length;
	const m = Math.floor(l / 2);
	return page[m];

}

function check_page(rules, page) {
    for (let i = page.length - 1; i > 0; i--) {
        const current_rule = rules[page[i]];
        if (!current_rule) continue;

        for (let j = i - 1; j >= 0; j--) {
            if (current_rule.includes(page[j])) {
                return false;
            }
        }
    }

    return true;
}

function parse(data) {
    const [rules_raw, pages_raw] = data.split('\n\n');

    const rules = rules_raw
        .trim()
        .split('\n')
        .map((rule) => rule.split('|').map(Number))
        .reduce((acc, rule) => {
            acc[rule[0]] = acc[rule[0]] ? acc[rule[0]].concat(rule.slice(1)) : rule.slice(1);
            return acc;
        }, {});

    const pages = pages_raw
        .trim()
        .split('\n')
        .map((line) => line.split(',').map(Number));

    return { rules, pages };
}
