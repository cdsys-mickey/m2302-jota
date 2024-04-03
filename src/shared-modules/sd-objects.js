import Arrays from "./sd-arrays";

/**
 * 所有欄位存在且不為 null
 */
const isAllPropsNotNull = (obj, columnPattern) => {
	if (!obj) {
		throw "obj 為 null";
	}
	if (!columnPattern) {
		return (
			Object.keys(obj).filter((key) => {
				const value = obj[key];
				return value === null || value === undefined;
			}).length === 0
		);
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((prop) => {
		return obj[prop] !== null && obj[prop] !== undefined;
	});
};

/**
 * 所有欄位存在且皆為 null
 * @param {*} obj
 * @param {*} columns
 */
const isAllPropsNull = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		return Object.keys(obj).filter((key) => obj[key] !== null).length === 0;
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((prop) => obj[prop] === null);
};

const isAllPropsEmpty = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		return Object.keys(obj).filter((key) => !!obj[key]).length === 0;
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((key) => !obj[key]);
};

const isAllPropsNotNullOrEmpty = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		return (
			Object.keys(obj).filter((key) => {
				const value = obj[key];

				return value === null || value === undefined || value === "";
			}).length === 0
		);
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((prop) => {
		const value = obj[prop];
		return value !== null && value !== undefined && value !== "";
	});
};

const hasNoProps = (obj) => {
	return Object.keys(obj).length === 0;
};

const hasAnyProp = (obj) => {
	return !hasNoProps(obj);
};

const hasAllProps = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		throw "未指定檢查屬性名";
	}
	const columns = Arrays.parse(columnPattern);
	return Object.keys(obj).includes(...columns);
};

const isAllPropsEqual = (x, y, opts = {}) => {
	const { fields, ignoresEmpty } = opts;
	if (x === null || x === undefined) {
		return false;
	}
	const columns = fields ? Arrays.parse(fields) : Object.keys(x);

	// 比對所有欄位
	if (ignoresEmpty) {
		for (const field of columns) {
			const valueX = x[field] || "";
			const valueY = y[field] || "";
			if (valueX !== valueY) {
				return false;
			}
		}
	} else {
		for (const field of columns) {
			if (x[field] !== y[field]) {
				return false;
			}
		}
	}
	return true;
};

const isAnyPropNotEmpty = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		for (const field of Object.keys(obj)) {
			if (obj[field]) {
				return true;
			}
		}
		return false;
	}
	const columns = Arrays.parse(columnPattern);
	for (const field of columns) {
		const value = obj[field];
		if (value) {
			return true;
		}
	}
	return false;
};

const Objects = {
	isAllPropsNotNull,
	isAllPropsNull,
	isAllPropsEmpty,
	isAllPropsNotNullOrEmpty,
	hasAllProps,
	isAllPropsEqual,
	isAnyPropNotEmpty,
	hasNoProps,
	hasAnyProp,
};

export default Objects;
