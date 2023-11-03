import Types from "./md-types";

const getArray = (s) => {
	if (Array.isArray(s)) {
		return s;
	}
	if (Types.isString(s)) {
		return s.split(/\s*,\s*/);
	}
	return [];
};

const Arrays = {
	getArray,
};

export default Arrays;
