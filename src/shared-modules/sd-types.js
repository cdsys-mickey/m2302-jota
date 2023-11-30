const isString = (s) => {
	return typeof s === "string" || s instanceof String;
};

const isObject = (o) => {
	return typeof s === "object";
};

const isNumber = (v) => {
	return typeof v === "number";
};

const Types = {
	isString,
	isObject,
	isNumber,
};

export default Types;
