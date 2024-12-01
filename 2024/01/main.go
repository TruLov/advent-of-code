package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	raw, err := read("input.txt")
	if err != nil {
		fmt.Println("Error reading input file:", err)
		return
	}

	a, b, err := parse(raw)
	if err != nil {
		fmt.Println("Error parsing input:", err)
		return
	}

	result := part1(a, b)
	fmt.Println(result)

	result2 := part2(a, b)
	fmt.Println(result2)

}

func read(path string) (string, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func parse(data string) ([]int, []int, error) {
	lines := strings.Split(string(data), "\n")
	if lines[len(lines)-1] == "" {
		lines = lines[:len(lines)-1]
	}

	var a, b []int
	for _, line := range lines {
		parts := strings.Fields(line) // Split the line by whitespace

		num1, err1 := strconv.Atoi(parts[0])
		num2, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			return nil, nil, fmt.Errorf("invalid numbers in line: ", line)
		}

		a = append(a, num1)
		b = append(b, num2)
	}

	// Sort the arrays
	sort.Ints(a)
	sort.Ints(b)

	return a, b, nil
}

func part1(a []int, b []int) int {
	result := 0
	for i := 0; i < len(a); i++ {
		result += int(math.Abs(float64(a[i] - b[i])))
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
