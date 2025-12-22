import Types from "@/shared-modules/Types.mjs";
import _ from "lodash";

const parse = (s, opts = {}) => {
	const { includeComments = false } = opts;
	if (Array.isArray(s)) {
		return s;
	}
	if (Types.isString(s)) {
		let result = s
			.trim()
			.split(/\s*,\s*/)
			.filter(Boolean); // 保留非空值

		// 如果 opts.includeComments 為 true，則進一步過濾掉以 "//" 開頭的元素
		if (!includeComments) {
			result = result.filter((item) => !item.startsWith("//"));
		}

		return result;
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

const sortByFoundIndex = (array, fields, searchValue) => {
	const input = searchValue.toLowerCase(); // 移到迴圈外
	return array.sort((a, b) => {
		for (const field of fields) {
			const aIndex = a[field].toLowerCase().indexOf(input);
			const bIndex = b[field].toLowerCase().indexOf(input);

			if (aIndex !== bIndex) {
				if (aIndex === -1) return 1; // a 無匹配，排後面
				if (bIndex === -1) return -1; // b 無匹配，排後面
				return aIndex - bIndex; // 比較位置
			}
		}

		return 0; // 無差異，保持順序
	});
};

const Arrays = {
	parse,
	toObject,
	rangeToObject,
	sortByFoundIndex,
};

export default Arrays;
