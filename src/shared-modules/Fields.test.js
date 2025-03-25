import { expect, it } from "vitest";
import Fields from "./Fields.mjs";

it("should parse into object with name as key", () => {
	const input = `
        ProdID:{select: false, value: "123"},
        ProdData,
        Barcode
    `;
	const fields = Fields.parse(input);
	const expected = {
		ProdID: { select: false, value: "123" },
		ProdData: {},
		Barcode: {},
	};
	expect(fields).toStrictEqual(expected);
});
