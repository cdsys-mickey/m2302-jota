import { DateFieldComponentExContainer } from "./DateFieldComponentExContainer";

export const createDateFieldColumnEx = (opts = {}) => {
	return {
		component: DateFieldComponentExContainer,
		columnData: opts,
		deleteValue: () => null,
		// We convert the date to a string for copying using toISOString
		copyValue: ({ rowData }) =>
			rowData ? rowData.toISOString().substr(0, 10) : null,
		// pasteValue: ({ value }) => {
		// 	const date = new Date(value.replace(/\.\s?|\//g, '-'))
		// 	return isNaN(date.getTime()) ? null : date
		// },
		// deleteValue: () => "",
		// copyValue: ({ rowData }) =>
		// 	rowData,
		pasteValue: ({ value }) => value,
		// Because the Date constructor works using iso format, we can use it to parse ISO string back to a Date object
		minWidth: 170,
		isCellEmpty: ({ rowData }) => !rowData,
	}
}