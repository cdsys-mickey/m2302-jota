import Types from "@/shared-modules/types";

it("should isString", () => {
	const s = "This is string";
	expect(Types.isString(s)).toBe(true);
	const o = {
		a: 1,
	};
	expect(Types.isString(o)).toBe(false);
});
