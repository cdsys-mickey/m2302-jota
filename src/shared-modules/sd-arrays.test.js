import { expect } from "vitest";
import { it } from "vitest";
import Arrays from "./Arrays";

it("should reduce range array to object", () => {
	let data = [{ name: "A" }, { name: "B" }, { name: "C" }];

	let result = Arrays.toObject(data, 3);
	let expected = {
		3: { name: "A" },
		4: { name: "B" },
		5: { name: "C" },
	};
	expect(result).toStrictEqual(expected);
});

it("should reduce range array to object", () => {
	let data = {};

	let result = Arrays.rangeToObject(3, 5, true, data);
	let expected = {
		3: true,
		4: true,
		5: true,
	};
	expect(result).toStrictEqual(expected);

	data = {
		1: false,
		2: false,
		3: false,
	};

	result = Arrays.rangeToObject(3, 5, true, data);
	expected = {
		1: false,
		2: false,
		3: true,
		4: true,
		5: true,
	};

	expect(result).toStrictEqual(expected);
});
