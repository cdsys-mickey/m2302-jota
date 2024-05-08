import HttpStatus from "@/shared-classes/HttpStatus";
import { expect } from "vitest";
import { it } from "vitest";

it("should throw is status is not specified in constructor", () => {
	expect(() => {
		HttpStatus.from();
	}).toThrow(Error);
});

it("should be ok", () => {
	let status = HttpStatus.from(200);
	expect(status.success).toBe(true);
});

it("401 should be 4xx", () => {
	let status = HttpStatus.from(401);
	expect(status.is4xx()).toBe(true);
});

it("401 should not be 5xx", () => {
	let status = HttpStatus.from(401);
	expect(status.is5xx()).toBe(false);
});
