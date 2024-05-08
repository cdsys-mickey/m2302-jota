import { it } from "vitest";
import DigitSeq from "./DigitSeq";
import { expect } from "vitest";

it("should increment correctly as NestedSeq", () => {
	const seq = new DigitSeq();

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

it("should getLevelText", () => {
	const seq = new DigitSeq();
	expect(seq.getNextLevelText()).toBe("01");
	expect(seq.getNextLevelText(0)).toBe("02");

	expect(seq.getNextLevelText(1)).toBe("0201");
	expect(seq.getNextLevelText(1)).toBe("0202");
	expect(seq.getNextLevelText(1)).toBe("0203");

	expect(seq.getNextLevelText(2)).toBe("020301");
	expect(seq.getNextLevelText(3)).toBe("02030101");

	expect(seq.getNextLevelText(2)).toBe("020302");
	expect(seq.getNextLevelText(3)).toBe("02030201");
});
