import { format, isSameDay, parse } from "date-fns";
import DateTimes from "./sd-date-times";
import DateFormat from "./sd-date-formats";
import { it } from "vitest";
import { expect } from "vitest";

it("should getWeekdayNames", () => {
	expect(DateTimes.getWeekdayNames()).toStrictEqual([
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
		"星期日",
	]);
});

it("should format endTime", () => {
	const begin = new Date("2022/08/27");
	const end = new Date("2022/08/27 18:00");
	expect(DateTimes.formatEndTime(begin, end)).toBe("18:00");
});

it("should format duration", () => {
	const begin = new Date("2022/08/27");
	const end = new Date("2022/08/27 18:00");
	expect(DateTimes.formatDuration(begin, end)).toBe("2022/08/27 ~ 18:00");
});

it("should format time as date", () => {
	const date = parse(
		"2019/03/07 00:00:00",
		DateFormat.DATEFNS_DATETIME_SECONDS,
		new Date()
	);
	expect(format(date, DateFormat.DATEFNS_DATE)).toBe("2019/03/07");
});

it("should parseEx", () => {
	const parsed = DateTimes.parseEx("2019/03/07");
	expect(isSameDay(parsed, new Date(2019, 2, 7))).toBe(true);
});

it("should formatAsRocDate", () => {
	const d1 = "2022/11/11 00:00:00";
	const e1 = "111/11/11 00:00:00";
	expect(DateTimes.formatAsRocDate(d1)).toBe(e1);

	const d2 = "1975/05/28";
	const e2 = "64/05/28";
	expect(DateTimes.formatAsRocDate(d2)).toBe(e2);

	const d3 = "1912/02/28 11:23";
	const e3 = "1/02/28 11:23";
	expect(DateTimes.formatAsRocDate(d3)).toBe(e3);
});

it("should stripTimePortion", () => {});
