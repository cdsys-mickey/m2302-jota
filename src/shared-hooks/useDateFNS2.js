import { useState, useEffect, useCallback } from "react";

import { addDays, format, startOfWeek, parse, isSameDay } from "date-fns";
import { zhTW } from "date-fns/locale";
import { DateFormat } from "@/shared-constants/dates";

const useDateFNS2 = () => {
	/**
	 * 星期天為 index 0 的星期幾名稱,
	 * 為了 java 的相容性, 於 index 7 再次加上 星期天
	 */
	const [weekdayNames, setWeekdayNames] = useState([]);

	const formatEnd = useCallback((endDate, beginDate) => {
		const sameDay = isSameDay(beginDate, endDate);
		return format(
			endDate,
			sameDay ? DateFormat.DATEFNS_TIME : DateFormat.DATEFNS_DATETIME
		);
	}, []);

	const formatDuration = useCallback(
		(beginDate, endDate) => {
			return `${format(
				beginDate,
				DateFormat.DATEFNS_DATETIME
			)} ~ ${formatEnd(endDate)}`;
		},
		[formatEnd]
	);

	const getWeekdayNames = useCallback(() => {
		if (weekdayNames.length === 0) {
			console.debug("retrieving weekdays...");
			const firstDayOfWeek = startOfWeek(new Date());
			const result = [
				...Array.from(Array(7)).map((_, i) =>
					format(addDays(firstDayOfWeek, i), "eeee", { locale: zhTW })
				),
				//為了 java 的相容性, 於 index 7 再次加上 星期天
				format(addDays(firstDayOfWeek, 7), "eeee", { locale: zhTW }),
			];
			setWeekdayNames(result);
			return result;
		}
		return weekdayNames;
	}, [weekdayNames]);

	return {
		// weekdayNames,
		getWeekdayNames,
		formatEnd,
		formatDuration,
	};
};

export default useDateFNS2;
