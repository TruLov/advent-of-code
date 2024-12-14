.PHONY: js go

js:
	@if [ "$(words $(MAKECMDGOALS))" -lt 3 ]; then \
		echo "usage: make js <year> <day>"; \
		exit 1; \
	fi
	@year=$(word 2, $(MAKECMDGOALS)); \
	day=$(word 3, $(MAKECMDGOALS)); \
	padded_day=$$(printf "%02d" $$day); \
	dir="$$year/$$padded_day"; \
	mkdir -p $$dir; \
	if [ ! -f $$dir/input.txt ]; then \
		touch $$dir/input.txt; \
		echo "Created: $$dir/input.txt"; \
	else \
		echo "Skipped: $$dir/input.txt (already exists)"; \
	fi; \
	if [ ! -f $$dir/main.js ]; then \
		echo "export function part1(data) {\n\n\treturn result;\n}\n\nexport function part2(data) {\n\n\treturn -1;\n}" > $$dir/main.js; \
		echo "Created: $$dir/main.js"; \
	else \
		echo "Skipped: $$dir/main.js (already exists)"; \
	fi;

go:
	@if [ "$(words $(MAKECMDGOALS))" -lt 3 ]; then \
		echo "usage: make go <year> <day>"; \
		exit 1; \
	fi
	@year=$(word 2, $(MAKECMDGOALS)); \
	day=$(word 3, $(MAKECMDGOALS)); \
	padded_day=$$(printf "%02d" $$day); \
	dir="$$year/$$padded_day"; \
	mkdir -p $$dir; \
	if [ ! -f $$dir/input.txt ]; then \
		touch $$dir/input.txt; \
		echo "Created: $$dir/input.txt"; \
	else \
		echo "Skipped: $$dir/input.txt (already exists)"; \
	fi; \
	if [ ! -f $$dir/main.go ]; then \
		echo 'package main\n\nimport (\n\t"fmt"\n\n\t"2024/utils"\n)\n\nfunc main() {\n\tlines, err := utils.ReadLines("input.txt")\n\tif err != nil {\n\t\tfmt.Println("Error reading input file:", err)\n\t\treturn\n\t}\n\n\tfmt.Println(part1(lines))\n\tfmt.Println(part2(lines))\n}\n\nfunc part1(lines []string) int {\n\treturn -1\n}\n\nfunc part2(lines []string) int {\n\treturn -1\n}' > $$dir/main.go; \
		echo "Created: $$dir/main.go"; \
	else \
		echo "Skipped: $$dir/main.go (already exists)"; \
	fi;

%:
	@:
