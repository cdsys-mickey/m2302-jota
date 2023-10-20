import NestedSeq from "@/shared-classes/NestedSeq";

// it("should throw an error when level is not specified", () => {
// 	const seq = new NestedSeq();
// 	expect(() => seq.getNext()).toThrow(Error);
// });

it("should increment correctly", () => {
	const seq = new NestedSeq();

	expect(seq.getNext(0)).toBe(1);
	expect(seq.getNext(0)).toBe(2);

	expect(seq.getNext(1)).toBe(1);
	expect(seq.getNext(1)).toBe(2);
	expect(seq.getNext(1)).toBe(3);
	expect(seq.getNext(2)).toBe(1);
	expect(seq.getNext(3)).toBe(1);
	expect(seq.getNext(2)).toBe(2);
	expect(seq.getNext(3)).toBe(1);
});

it("should indent correctly even if levels are skipped", () => {
	const seq = new NestedSeq();
	expect(seq.getNext(2)).toBe(1);
	expect(seq.getNext(2)).toBe(2);
});
