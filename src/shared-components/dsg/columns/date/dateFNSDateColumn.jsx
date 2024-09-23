import { default as DateFormats, default as DateTimes } from "@/shared-modules/sd-date-times";
import { DateFnsComponentContainer } from "./DateFnsComponentContainer";

export const dateFNSDateColumn = {
	component: DateFnsComponentContainer,
	deleteValue: () => "",
	copyValue: ({ rowData }) =>
		rowData ? rowData.toISOString().substr(0, 10) : null,
	pasteValue: ({ value }) => {
		const date = DateTimes.parse(value, DateFormats.DATEFNS_DATE_DASH);
		return isNaN(date.getTime()) ? null : date;
	},
	// minWidth: 170,
	isCellEmpty: ({ rowData }) => !rowData,
};
