const isString = (v) => {
	return typeof v === "string" || v instanceof String;
};

const isObject = (v) => {
	return typeof v === "object";
};

const isNumber = (v) => {
	return typeof v === "number";
};

const isArray = (v) => {
	return Array.isArray(v);
};

const Types = {
	isString,
	isObject,
	isNumber,
	isArray,
};

export default Types;
