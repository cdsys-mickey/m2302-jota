import { it } from "vitest";
import Forms from "./md-forms";
import { expect } from "vitest";

it("should prepareForSubmit", () => {
	const source = {
		sdate: new Date(2022, 0, 2),
		edate: undefined,
	};

	const expected = {
		sdate: "2022/01/02",
	};

	expect(
		Forms.processDateFieldsForSubmit(source, "sdate,edate")
	).toStrictEqual(expected);

	expect(
		Forms.processDateFieldsForSubmit(
			source,
			`
			sdate,
			edate
			`
		)
	).toStrictEqual(expected);

	expect(
		Forms.processDateFieldsForSubmit(source, ["sdate", "edate"])
	).toStrictEqual(expected);
});

it("should processDateFieldsForReset", () => {
	const source = {
		sdate: "2022/01/02",
	};
	const expected = {
		sdate: new Date(2022, 0, 2),
	};
	expect(
		Forms.processDateFieldsForReset(
			source,
			`
			sdate,
			`
		)
	).toStrictEqual(expected);
});
