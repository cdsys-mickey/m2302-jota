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

const isFunction = (v) => {
	return typeof v === "function";
};

const isPromise = (v) => {
	return v instanceof Promise;
};

const isBoolean = (v) => {
	return typeof v === "boolean";
};

const isLiteral = (v) => {
	return isString(v) || isNumber(v) || isBoolean(v);
};

const Types = {
	isString,
	isObject,
	isNumber,
	isArray,
	isFunction,
	isBoolean,
	isLiteral,
	isPromise,
};

export default Types;
