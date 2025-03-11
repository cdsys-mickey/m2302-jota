import { toastEx } from "@/helpers/toast-ex";
import { isValid } from "date-fns";
import DateFormats from "./sd-date-formats";
import DateTimes from "./sd-date-times";
import Types from "./sd-types";

const formatDate = (value, format) => {
	if (!value) {
		return null;
	}
	let result = null;
	if (value instanceof Date) {
		result = DateTimes.format(value, format);
	} else if (typeof value === "string") {
		result = value?.replace(/\.\s?|\/|-/g, "/");
	}
	console.log(`reformat ${value} as ${result}`);
	return result;
};

const formatDateTime = (
	value,
	format = DateFormats.DATEFNS_DATETIME_SECONDS
) => {
	return formatDate(value, format);
};

const formatYear = (value) => {
	if (!value) {
		return null;
	}
	let result = null;
	if (value instanceof Date) {
		result = DateTimes.format(value, DateFormats.DATEFNS_YEAR);
	} else if (typeof value === "string") {
		result = value;
	}
	return result;
};

const formatYearMonth = (value) => {
	if (!value) {
		return null;
	}
	let result = null;
	if (value instanceof Date) {
		result = DateTimes.format(value, DateFormats.DATEFNS_YEAR_AND_MONTH);
	} else if (typeof value === "string") {
		result = value;
	}
	return result;
};

const reformatDateAsDash = (value) => {
	return formatDate(value, DateFormats.DATEFNS_DATE_DASH);
};

const parseDate = (value, pattern) => {
	return DateTimes.parse(value, pattern);
};

const formatTime = (value, format = "HH:mm") => {
	if (!value) {
		return null;
	}
	let result = null;
	if (value instanceof Date) {
		result = DateTimes.format(value, format);
	} else if (typeof value === "string") {
		result = value;
	}
	console.log(`reformat ${value} as ${result}`);
	return result;
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

const onSubmitError = (err) => {
	toastEx.error("資料驗證失敗, 請檢查並修正標註錯誤的欄位後，再重新送出");
};

const getDateValidator =
	(opts = {}) =>
	(value) => {
		const {
			errorMessage = "日期格式錯誤",
			required = false,
			fieldName = "日期",
			requiredMessage,
		} = opts;
		if (!value) {
			if (required) {
				if (fieldName) {
					return `${fieldName}為必填`;
				}
				if (requiredMessage) {
					return requiredMessage;
				}
				return "日期為必填";
			}
		} else if (!isValid(value)) {
			return errorMessage;
		}
		return true;
	};

const validateDate = (value) => {
	return getDateValidator()(value);
};

const getTimeValidator =
	(opts = {}) =>
	(value) => {
		const {
			errorMessage = "時間格式錯誤",
			required = false,
			fieldName = "時間",
			requiredMessage,
		} = opts;
		if (!value) {
			if (required) {
				if (fieldName) {
					return `${fieldName}為必填`;
				}
				if (requiredMessage) {
					return requiredMessage;
				}
				return "時間為必填";
			}
		} else {
			if (!isValid(value)) {
				return errorMessage;
			}
		}
		return true;
	};

const validateTime = (value) => {
	return getTimeValidator()(value);
};

const Forms = {
	formatDate,
	formatDateTime,
	parseDate,
	processDateFieldsForSubmit,
	processDateFieldsForReset,
	// processNumberFieldsForSubmit,
	assignDefaultValues,
	reformatDateAsDash,
	onSubmitError,
	getDateValidator,
	validateDate,
	getTimeValidator,
	validateTime,
	formatTime,
	formatYear,
	formatYearMonth,
};

export default Forms;
