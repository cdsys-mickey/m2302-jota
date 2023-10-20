import {
	addDays,
	format,
	getHours,
	getMinutes,
	getSeconds,
	getYear,
	isDate,
	isSameDay,
	parse,
	startOfWeek,
} from "date-fns";
import { zhTW } from "date-fns/locale";
import DateFormats from "./date-formats";

const MOMENTS_FORMATS = Object.freeze({
	MOMENTS_VERSION: "YYYYMMDD.HHmm",
	MOMENTS_DATE: "YYYY/MM/DD",
	MOMENTS_DATETIME: "YYYY/MM/DD HH:mm",
	MOMENTS_DATETIME_SECONDS: "YYYY/MM/DD HH:mm:ss",
	MOMENTS_TIME: "HH:mm",
	MOMENTS_TIME_SECONDS: "HH:mm:ss",
});

const DATEFNS_FORMATS = Object.freeze({
	DATEFNS_VERSION: "yyyyMMdd.HHmm",
	DATEFNS_DATE: "yyyy/MM/dd",
	DATEFNS_MONTH_AND_DAY: "yyyy/MM/dd",
	DATEFNS_YEAR_AND_MONTH: "yyyyMM",
	DATEFNS_DATETIME: "yyyy/MM/dd HH:mm",
	DATEFNS_DATETIME_SECONDS: "yyyy/MM/dd HH:mm:ss",
	DATEFNS_TIME: "HH:mm",
	DATEFNS_TIME_SECONDS: "HH:mm:ss",
});

const getWeekdayNames = () => {
	const firstDayOfWeek = startOfWeek(new Date());
	const result = [
		...Array.from(Array(7)).map((_, i) =>
			format(addDays(firstDayOfWeek, i), "eeee", { locale: zhTW })
		),
		//為了 java 的相容性, 於 index 7 再次加上 星期天
		format(addDays(firstDayOfWeek, 7), "eeee", { locale: zhTW }),
	];
	return result;
};

const formatEndTime = (beginDate, endDate) => {
	const sameDay = isSameDay(beginDate, endDate);
	return format(
		endDate,
		sameDay ? DateFormats.DATEFNS_TIME : DateFormats.DATEFNS_DATETIME
	);
};

const formatDuration = (beginDate, endDate) => {
	return `${format(
		beginDate,
		isStartOfDay(beginDate)
			? DateFormats.DATEFNS_DATE
			: DateFormats.DATEFNS_DATETIME
	)} ~ ${formatEndTime(beginDate, endDate)}`;
};

const isStartOfDay = (date) => {
	return (
		isDate(date) &&
		getHours(date) === 0 &&
		getMinutes(date) === 0 &&
		getSeconds(date) === 0
	);
};

const getPattern = (s) => {
	const length = s.length;
	switch (length) {
		case DateFormats.DATEFNS_DATETIME_SECONDS.length:
			// yyyy/MM/dd HH:mm:ss
			return DateFormats.DATEFNS_DATETIME_SECONDS;
		case DateFormats.DATEFNS_DATETIME.length:
			// yyyy/MM/dd HH:mm
			return DateFormats.DATEFNS_DATETIME;
		case DateFormats.DATEFNS_DATE.length:
		default:
			// yyyy/MM/dd
			return DateFormats.DATEFNS_DATE;
	}
};

const parseEx = (s, pattern) => {
	if (!s) {
		return null;
	}
	const p = pattern || getPattern(s);
	return parse(s, p, new Date());
};

const stripYearPart = (p) => {
	const firstIndex = p.indexOf("/");
	return p.substring(firstIndex + 1);
};

const stripPatternTimePart = (p) => {
	if (p.endsWith(DateFormats.DATEFNS_TIME_SECONDS)) {
		return p
			.substring(0, p.length - DateFormats.DATEFNS_TIME_SECONDS.length)
			.trimEnd();
	}
	if (p.endsWith(DateFormats.DATEFNS_TIME)) {
		return p
			.substring(0, p.length - DateFormats.DATEFNS_TIME.length)
			.trimEnd();
	}
	return p;
};

const formatAsRocDate = (s, pattern) => {
	let date = null;

	if (!s) {
		return null;
	}

	if (isDate(s)) {
		date = s;
	} else {
		try {
			date = parseEx(s);
		} catch (err) {
			throw new Error(`failed to parse: ${err?.message}`);
		}
	}
	const yearPart = getYear(date);

	const p = stripYearPart(pattern || getPattern(s));

	return format(date, `${yearPart - 1911}/${format(date, p)}`);
};

const formatDateTimeAsDate = (s) => {
	let date = null;

	if (!s) {
		return null;
	}

	if (isDate(s)) {
		date = s;
	} else {
		try {
			date = parseEx(s);
		} catch (err) {
			throw new Error(`failed to parse: ${err?.message}`);
		}
	}

	const p = stripPatternTimePart(getPattern(s));

	return format(date, p);
};

const formatDateTimeAsRocDate = (s) => {
	return formatAsRocDate(formatDateTimeAsDate(s));
};

const DateTimes = {
	MOMENTS_FORMATS,
	...MOMENTS_FORMATS,
	DATEFNS_FORMATS,
	...DATEFNS_FORMATS,
	getWeekdayNames,
	formatEndTime,
	formatDuration,
	parseEx,
	formatAsRocDate,
	formatDateTimeAsRocDate,
	formatDateTimeAsDate,
};

export default DateTimes;
