import Types from "./md-types";

const parse = (s) => {
	if (Array.isArray(s)) {
		return s;
	}
	if (Types.isString(s)) {
		return s.split(/\s*,\s*/);
	}
	return [];
};

const Arrays = {
	parse,
};

export default Arrays;
