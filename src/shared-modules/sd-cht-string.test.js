import { expect, test } from "vitest";
import ChtStr from "./sd-cht-string";

test("數字轉中文", () => {
	expect(ChtStr.fromNumber(0)).toBe("零");
	expect(ChtStr.fromNumber(1)).toBe("一");
	expect(ChtStr.fromNumber(2)).toBe("二");
	expect(ChtStr.fromNumber(3)).toBe("三");
	expect(ChtStr.fromNumber(4)).toBe("四");
	expect(ChtStr.fromNumber(5)).toBe("五");
	expect(ChtStr.fromNumber(6)).toBe("六");
	expect(ChtStr.fromNumber(7)).toBe("七");
	expect(ChtStr.fromNumber(8)).toBe("八");
	expect(ChtStr.fromNumber(9)).toBe("九");
	expect(ChtStr.fromNumber(10)).toBe("十");
	expect(ChtStr.fromNumber(11)).toBe("十一");
	expect(ChtStr.fromNumber(20)).toBe("二十");
	expect(ChtStr.fromNumber(21)).toBe("二十一");
	expect(ChtStr.fromNumber(88)).toBe("八十八");
	expect(ChtStr.fromLargeNumber(100)).toBe("一百");
	expect(ChtStr.fromLargeNumber(101)).toBe("一百零一");
});

test("數字轉天干", () => {
	expect(ChtStr.toCelestialStem(1)).toBe("甲");
	expect(ChtStr.toCelestialStem("2")).toBe("乙");
	expect(ChtStr.toCelestialStem(9)).toBe("壬");
	expect(ChtStr.toCelestialStem(10)).toBe("癸");
});

test("數字轉天干超過 10", () => {
	expect(ChtStr.toCelestialStem(11)).toBe("");
	expect(ChtStr.toCelestialStem("a")).toBe("");
});

test("全形半形轉換", () => {
	expect(ChtStr.toFullWidth(1)).toBe("１");
	expect(ChtStr.toFullWidth("2")).toBe("２");

	expect(ChtStr.toFullWidth("１")).toBe("１");
	expect(ChtStr.toFullWidth(",")).toBe("，");
	expect(ChtStr.toFullWidth(".")).toBe("．");
	expect(ChtStr.toFullWidth("２")).toBe("２");
});

test("全形半形轉換 例外", () => {});
