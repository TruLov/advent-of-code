package main

import (
	"fmt"
	"sort"
	"strconv"
	"strings"

	"2024/utils"
)

func main() {
	lines, err := utils.ReadLines("input.txt")
	if err != nil {
		fmt.Println("Error reading input file:", err)
		return
	}

	a, b, err := parse(lines)
	if err != nil {
		fmt.Println("Error parsing input:", err)
		return
	}

	fmt.Println(part1(a, b))
	fmt.Println(part2(a, b))
}

func part1(a []int, b []int) int {
	result := 0
	for i := 0; i < len(a); i++ {
		result += utils.Abs(a[i] - b[i])
	}

	return result
}

func part2(a []int, b []int) int {
	b_counts := make(map[int]int)
	for _, num := range b {
		b_counts[num]++
	}

	result := 0
	for _, num := range a {
		count := b_counts[num]
		result += num * count
	}

	return result
}

func parse(lines []string) ([]int, []int, error) {
	var a, b []int
	for _, line := range lines {
		parts := strings.Fields(line) // Split the line by whitespace

		num1, err1 := strconv.Atoi(parts[0])
		num2, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			return nil, nil, fmt.Errorf("invalid numbers in line: %s", line)
		}

		a = append(a, num1)
		b = append(b, num2)
	}

	// Sort the arrays
	sort.Ints(a)
	sort.Ints(b)

	return a, b, nil
}
