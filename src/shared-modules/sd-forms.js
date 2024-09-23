import DateTimes from "./sd-date-times";
import DateFormats from "./sd-date-formats";
import Types from "./sd-types";

const formatDate = (value, pattern) => {
	return DateTimes.format(value, pattern);
};

const reformatDate2 = (value) => {
	return formatDate(DateTimes.parse(value), DateTimes.DATEFNS_DATE_DASH);
};

const reformatDate = (value, format) => {
	let result = "";
	switch (typeof value) {
		case "Date":
			result = formatDate(value, format);
			break;
		default:
			result = value.replaceAll("/", "-");
			break;
	}
	console.log(`reformat ${value} as ${result}`);
	return result;
};

const parseDate = (value, pattern) => {
	return DateTimes.parse(value, pattern);
};

const processDateFieldsForSubmit = (
	obj,
	dateFields,
	pattern = DateFormats.DATEFNS_DATE
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
			console.log(`delete empty date field: ${field}`);
			delete resultObj[field];
		} else {
			try {
				// resultObj[field] = format(resultObj[field], pattern);
				resultObj[field] = formatDate(resultObj[field], pattern);
				console.log(
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
	pattern = DateFormats.DATEFNS_DATE
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
				console.log(
					`parsing date field[${field}]: ${resultObj[field]}`
				);
				// resultObj[field] = DateTimes.parse(resultObj[field], pattern);
				resultObj[field] = parseDate(resultObj[field], pattern);
			} catch (err) {
				console.error(
					`failed to format ${resultObj[field]} as date in pattern[${pattern}]`
				);
			}
		}
	}
	return resultObj;
};

// const processNumberFieldsForSubmit = (obj, numberFields) => {
// 	let resultObj = {
// 		...obj,
// 	};

// 	let fields = [];
// 	if (Types.isString(numberFields)) {
// 		fields = numberFields.trim().split(/\s*,\s*/);
// 	} else if (Array.isArray(numberFields)) {
// 		fields = numberFields;
// 	}
// 	for (const field of fields) {
// 		const value = resultObj[field];
// 		if (isNaN(value)){
// 			resultObj[field] = 0;
// 		}
// 	}
// 	return resultObj;
// };

const assignDefaultValues = (obj, fieldNames, defaultValue = "") => {
	let resultObj = {
		...obj,
	};

	let fields = [];
	if (Types.isString(fieldNames)) {
		fields = fieldNames.trim().split(/\s*,\s*/);
	} else if (Array.isArray(fieldNames)) {
		fields = fieldNames;
	}
	for (const field of fields) {
		const value = resultObj[field];
		if (!value) {
			resultObj[field] = defaultValue;
		}
	}
	return resultObj;
};

const Forms = {
	formatDate,
	parseDate,
	processDateFieldsForSubmit,
	processDateFieldsForReset,
	// processNumberFieldsForSubmit,
	assignDefaultValues,
	reformatDate,
};

export default Forms;
