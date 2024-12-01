package main

import (
	"fmt"

	"2015/utils"
)

func main() {
	data, err := utils.Read("input.txt")
	if err != nil {
		fmt.Println("Error reading input file:", err)
		return
	}

	fmt.Println(part1(data))
	fmt.Println(part2(data))
}

func part1(data string) int {
	floor := 0

	for _, c := range data {
		if c == '(' {
			floor++
		} else {
			floor--
		}
	}

	return floor
}

func part2(data string) int {
	floor := 0

	for i, c := range data {
		if c == '(' {
			floor++
		} else {
			floor--
		}
		if floor == -1 {
			return i + 1
		}
	}

	return floor
}
