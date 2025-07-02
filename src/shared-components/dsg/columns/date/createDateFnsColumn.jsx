import DateFormats from "@/shared-modules/DateFormats.mjs";
import DateTimes from "@/shared-modules/DateTimes.mjs";
import { DateFnsComponentContainer } from "./DateFnsComponentContainer";

export const createDateFnsColumn = (opts = {}) => {
	return {
		component: DateFnsComponentContainer,
		columnData: opts,
		deleteValue: () => null,
		copyValue: ({ rowData }) =>
			rowData ? rowData.toISOString().substr(0, 10) : null,
		pasteValue: ({ value }) => {
			const date = DateTimes.parse(value, DateFormats.DATEFNS_DATE_DASH);
			return isNaN(date.getTime()) ? null : date;
		},
		minWidth: 170,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
