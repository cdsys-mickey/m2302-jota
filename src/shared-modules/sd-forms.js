import { format } from "date-fns";
import DateTimes from "./sd-date-times";
import DateFormat from "./sd-date-formats";
import Types from "./sd-types";

const processDateFieldsForSubmit = (
	obj,
	dateFields,
	pattern = DateFormat.DATEFNS_DATE
) => {
	if (!dateFields) {
		throw new Error("dateFields not specified!");
	}

	let resultObj = {
		...obj,
	};
	let fields = [];
	if (Types.isString(dateFields)) {
		fields = dateFields.trim().split(/\s*,\s*/);
	} else if (Array.isArray(dateFields)) {
		fields = dateFields;
	}
	for (const field of fields) {
		if (!resultObj[field]) {
			console.debug(`delete empty date field: ${field}`);
			delete resultObj[field];
		} else {
			try {
				resultObj[field] = format(resultObj[field], pattern);
				console.debug(
					`field [${field}] formatted -> ${resultObj[field]}`
				);
			} catch (err) {
				console.error(
					`failed to format ${resultObj[field]} as a date in pattern[${pattern}]`
				);
			}
		}
	}
	return resultObj;
};

const processDateFieldsForReset = (
	obj,
	dateFields,
	pattern = DateFormat.DATEFNS_DATE
) => {
	if (!dateFields) {
		throw new Error("dateFields not specified!");
	}

	let resultObj = {
		...obj,
	};
	let fields = [];
	if (Types.isString(dateFields)) {
		fields = dateFields.trim().split(/\s*,\s*/);
	} else if (Array.isArray(dateFields)) {
		fields = dateFields;
	}
	for (const field of fields) {
		if (resultObj[field]) {
			try {
				console.debug(
					`parsing date field[${field}]: ${resultObj[field]}`
				);
				resultObj[field] = DateTimes.parseEx(resultObj[field], pattern);
			} catch (err) {
				console.error(
					`failed to format ${resultObj[field]} as date in pattern[${pattern}]`
				);
			}
		}
	}
	return resultObj;
};

const Forms = {
	processDateFieldsForSubmit,
	processDateFieldsForReset,
};

export default Forms;
