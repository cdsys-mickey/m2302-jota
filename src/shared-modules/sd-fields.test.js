import { expect, it } from "vitest";
import Fields from "./sd-fields";

it("should parse", () => {
	const input = `
		ProdID:{select: false, value: "123"},
		ProdData,
		Barcode`;
	const fields = Fields.parse(input);
	const expected = [
		{ name: "ProdID", select: false, value: "123" },
		{ name: "ProdData" },
		{ name: "Barcode" },
	];
	expect(fields).toStrictEqual(expected);
});
