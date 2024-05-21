import DateFNSDateComponent from "./DateFNSDateComponent";
import DateTimes from "@/shared-modules/sd-date-times";
import DateFormats from "@/shared-modules/sd-date-times";

export const dateFNSDateColumn = {
	component: DateFNSDateComponent,
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
