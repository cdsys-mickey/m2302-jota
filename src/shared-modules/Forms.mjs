import { toastEx } from "shared-components/toast-ex";
import { isBefore, isValid } from "date-fns";
import DateFormats from "./DateFormats.mjs";
import Types from "@/shared-modules/Types.mjs";
import DateTimes from "./DateTimes.mjs";

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

const parseTime = (value, pattern = DateFormats.DATEFNS_TIME) => {
	return DateTimes.parse(value, pattern);
};

const parseDateAndTime = (
	dateValue,
	timeValue,
	pattern = DateFormats.DATEFNS_DATETIME
) => {
	return DateTimes.parse(`${dateValue} ${dateValue}`, pattern);
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
			minDate,
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
		} else if (minDate) {
			if (isBefore(value, minDate)) {
				return `必須在 ${Forms.formatDate(minDate)} (含)之後`;
			}
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

const parseNumber = (value, defaultValue = 0) => {
	if (typeof value === "number") return value;
	return typeof value === "string"
		? Number(value.replace(/,/g, "")) ?? defaultValue
		: defaultValue;
};

const formatMoney = (amount, precision = 2) => {
	// return number.toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, "$&,");
	return parseNumber(amount)
		.toFixed(precision)
		.replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const formatLiteral = (value) => {
	// 檢查是否為字符串
	if (typeof value === "string") {
		return value.trim();
	}
	// 檢查是否為數字（排除 NaN 和 Infinity）
	if (typeof value === "number" && isFinite(value)) {
		// 如果是整數，直接返回字符串形式
		if (Number.isInteger(value)) {
			return value.toString();
		}
		// 非整數，保留最多兩位小數
		return formatMoney(value);
	}
	// 檢查是否為布林
	if (typeof value === "boolean") {
		return value ? "是" : "否";
	}
	// 其他類型返回空字符串
	return "";
};

const Forms = {
	formatDate,
	formatDateTime,
	parseDate,
	parseTime,
	parseDateAndTime,
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
	formatMoney,
	parseNumber,
	formatLiteral,
};

export default Forms;
