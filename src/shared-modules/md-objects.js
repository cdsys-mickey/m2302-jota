import Arrays from "./md-arrays";

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
	const columns = Arrays.getArray(columnPattern);
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
		throw "obj 為 null";
	}
	if (!columnPattern) {
		return Object.keys(obj).filter((key) => obj[key] !== null).length === 0;
	}
	const columns = Arrays.getArray(columnPattern);
	return columns.every((prop) => obj[prop] === null);
};

const isAllPropsNotNullOrEmpty = (obj, columnPattern) => {
	if (!obj) {
		throw "obj 為 null";
	}
	if (!columnPattern) {
		return (
			Object.keys(obj).filter((key) => {
				const value = obj[key];

				return value === null || value === "";
			}).length === 0
		);
	}
	const columns = Arrays.getArray(columnPattern);
	return columns.every((prop) => {
		const value = obj[prop];
		return value !== null && value !== "";
	});
};

const hasAllProps = (obj, columnPattern) => {
	if (!obj) {
		throw "obj 為 null";
	}
	if (!columnPattern) {
		throw "未指定檢查屬性名";
	}
	const columns = Arrays.getArray(columnPattern);
	return Object.keys(obj).includes(...columns);
};

const Objects = {
	isAllPropsNotNull,
	isAllPropsNull,
	isAllPropsNotNullOrEmpty,
	hasAllProps,
};

export default Objects;
