import PageResult from "@/shared-classes/PageResult";
import { test } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";

it("should return pageResult by new", () => {
	let pageResult = new PageResult(30, 20);
	expect(pageResult.totalPages).toBe(2);
});

it("should return correctly when totalElements is 0", () => {
	let pageResult = new PageResult(0, 20);
	expect(pageResult.totalPages).toBe(0);
});

it("should return correctly when totalElements is 1", () => {
	let pageResult = new PageResult(1, 20);
	expect(pageResult.totalPages).toBe(1);
});

test("getRange ok", () => {
	let pageResult = new PageResult(30, 20);
	expect(pageResult.totalPages).toBe(2);
	expect(pageResult.getRange(1)).toStrictEqual([1, 20]);
	expect(pageResult.getRange(2)).toStrictEqual([21, 30]);
	expect(pageResult.getStartingItemNumber(2)).toBe(21);
});

it("should return correct range 20, 30", () => {
	let pageResult = PageResult.of(20, 30);
	expect(pageResult.totalPages).toBe(1);
});

it("should return correct range 21 -> 30", () => {
	let pageResult = PageResult.of(31, 20);
	expect(pageResult.totalPages).toBe(2);
	expect(pageResult.getStartingItemNumber(2)).toBe(21);
});

it("should return pageResult by static", () => {
	let pageResult = PageResult.of(30, 20);
	expect(pageResult.totalPages).toBe(2);
});

it("should return pageResult by of", () => {
	let pageResult = PageResult.of(30, 20).asObject();
	expect(pageResult).toStrictEqual({
		totalPages: 2,
		totalElements: 30,
		size: 20,
	});
});

it("should return pageResult forPage", () => {
	expect(PageResult.of(30, 20).forPage(1)).toStrictEqual({
		page: 1,
		totalPages: 2,
		totalElements: 30,
		numberOfElements: 20,
		size: 20,
	});

	expect(PageResult.of(30, 20).forPage(2)).toStrictEqual({
		page: 2,
		totalPages: 2,
		totalElements: 30,
		numberOfElements: 10,
		size: 20,
	});
});

it("should return numberOfElements to be zero", () => {
	let pageResult = PageResult.of(0, 20);

	expect(pageResult.forPage(0).numberOfElements).toBe(0);
	expect(pageResult.forPage(1).numberOfElements).toBe(0);
	expect(pageResult.forPage(2).numberOfElements).toBe(0);
});

it("should hasPrev, hasNext", () => {
	const pageResult = PageResult.of(1000, 100);
	expect(pageResult.forPage(1)).toStrictEqual({
		page: 1,
		totalPages: 10,
		totalElements: 1000,
		numberOfElements: 100,
		size: 100,
	});

	expect(pageResult.hasPrev(1)).toBe(false);
	expect(pageResult.hasPrev(2)).toBe(true);
	expect(pageResult.hasNext(9)).toBe(true);
	expect(pageResult.hasNext(10)).toBe(false);
});
