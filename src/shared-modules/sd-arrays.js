import Types from "./sd-types";
import _ from "lodash";

const parse = (s) => {
	if (Array.isArray(s)) {
		return s;
	}
	if (Types.isString(s)) {
		return s.split(/\s*,\s*/);
	}
	return [];
};

const toObject = (data, start = 0, original = {}) => {
	let index = start;
	let result = data.reduce((prev, curr) => {
		return Object.assign(prev, {
			[index++]: curr,
		});
	}, original);
	return result;
};

const rangeToObject = (start, stop, value, original = {}) => {
	let result = _.range(start, stop + 1).reduce((prev, curr) => {
		return Object.assign(prev, {
			[curr]: value,
		});
	}, original);
	return result;
};

const Arrays = {
	parse,
	toObject,
	rangeToObject,
};

export default Arrays;
