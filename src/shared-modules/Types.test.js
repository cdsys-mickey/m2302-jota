import Types from "@/shared-modules/Types.mjs";
import { expect } from "vitest";
import { it } from "vitest";

it("should isString", () => {
	const s = "This is string";
	expect(Types.isString(s)).toBe(true);
	const o = {
		a: 1,
	};
	expect(Types.isString(o)).toBe(false);
	expect(Types.isString(null)).toBe(false);
});
