import CommonStyles from "./CommonStyles.mjs";
import Arrays from "./Arrays";
import _ from "lodash";

const DEFAULT_PROPS_OPTS = {
	ignoresEmpty: true,
	debug: false,
	debugValues: false,
	header: "",
	nullishEquivalent: true, // 是否將 null 與 undefined 視為相同
};

/**
 * 所有欄位存在且不為 null 也不為 undefined
 */
const isAllPropsNotNull = (obj, columnPattern) => {
	if (!obj) {
		throw "obj 為 null";
	}
	if (!columnPattern) {
		return (
			Object.keys(obj).filter((key) => {
				const value = obj[key];
				return value == null;
			}).length === 0
		);
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((prop) => {
		return obj[prop] != null;
	});
};

const isAllPropsNotUndefined = (obj, columnPattern) => {
	if (!obj) {
		throw "obj 為 null";
	}
	if (!columnPattern) {
		return (
			Object.keys(obj).filter((key) => {
				return obj[key] !== undefined;
			}).length === 0
		);
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((prop) => {
		return obj[prop] !== undefined;
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

const isAllPropsNullOrEmpty = (obj, columnPattern) => {
	if (!obj) {
		throw "obj cabnot be null";
	}
	if (!columnPattern) {
		return Object.keys(obj).filter((key) => !!obj[key]).length === 0;
	}
	const columns = Arrays.parse(columnPattern);
	return columns.every((key) => {
		const value = obj[key];
		return value === null || value === undefined || value === "";
	});
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

const isAllPropsNotEmpty = (obj, columnPattern, opts = {}) => {
	const { nullAsNotEmpty = false } = opts;

	if (!obj) {
		throw new Error("obj cannot be null");
	}

	// 檢查所有屬性是否符合條件
	const isValueNotEmpty = (value) =>
		(nullAsNotEmpty && value === null) ||
		(value !== undefined && value !== "");

	if (!columnPattern) {
		// 檢查 `obj` 所有屬性
		return Object.values(obj).every(isValueNotEmpty);
	}

	// 解析 `columnPattern` 並檢查指定屬性
	const columns = Array.isArray(columnPattern)
		? columnPattern
		: columnPattern.split(",");
	return columns.every((prop) => isValueNotEmpty(obj[prop]));
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

// const isAllPropsEqual = (x, y, opts = {}) => {
// 	const { fields, ignoresEmpty } = opts;
// 	if (x === null || x === undefined) {
// 		return false;
// 	}
// 	const columns = fields ? Arrays.parse(fields) : Object.keys(x);

// 	// 比對所有欄位
// 	if (ignoresEmpty) {
// 		for (const field of columns) {
// 			const valueX = x[field] || "";
// 			const valueY = y[field] || "";
// 			if (valueX !== valueY) {
// 				return false;
// 			}
// 		}
// 	} else {
// 		for (const field of columns) {
// 			if (x[field] !== y[field]) {
// 				return false;
// 			}
// 		}
// 	}
// 	return true;
// };

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

const arePropsEqual = (obj1, obj2, opts = DEFAULT_PROPS_OPTS) => {
	const {
		fields,
		ignoreFields,
		ignoresEmpty,
		debug,
		debugValues,
		header,
		nullishEquivalent,
		deepCompare = false,
	} = opts;

	// if (debug && header) {
	// 	console.log(`comparing ${header}`, obj1, obj2);
	// }

	if (nullishEquivalent) {
		// comapre null
		if (
			(obj1 === null || obj1 === undefined) &&
			(obj2 !== null || obj2 !== undefined)
		) {
			return false;
		} else if (
			(obj1 !== null || obj1 !== undefined) &&
			(obj2 === null || obj2 === undefined)
		) {
			return false;
		} else if (
			(obj1 === null || obj1 === undefined) &&
			(obj2 === null || obj2 === undefined)
		) {
			return true;
		}
	} else {
		if (obj1 === null && obj2 !== null) {
			return false;
		} else if (obj1 === undefined && obj2 !== undefined) {
			return false;
		} else if (obj1 !== null && obj2 === null) {
			return false;
		} else if (obj1 !== undefined && obj2 === undefined) {
			return false;
		} else if (obj1 === null && obj2 === null) {
			return true;
		} else if (obj1 === undefined && obj2 === undefined) {
			return true;
		}
	}

	// compare key count
	let keys1 = fields ? Arrays.parse(fields) : Object.keys(obj1);
	let keys2 = fields ? Arrays.parse(fields) : Object.keys(obj2);

	if (ignoreFields) {
		const ignoreFieldNames = Arrays.parse(ignoreFields);
		keys1 = keys1.filter((x) => !ignoreFieldNames.includes(x));
		keys2 = keys2.filter((x) => !ignoreFieldNames.includes(x));
	}

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		const value1 = ignoresEmpty ? _.get(obj1, key) ?? "" : _.get(obj1, key);
		const value2 = ignoresEmpty ? _.get(obj2, key) ?? "" : _.get(obj2, key);

		if (!deepCompare ? value1 !== value2 : !_.isEqual(value1, value2)) {
			if (debug) {
				console.warn(
					`%C${header ? header + "." : ""}${key} mismatched ${
						deepCompare ? "(deepCompare)" : ""
					}: ${value1} → `,
					CommonStyles.CONSOLE_WARN,
					value2
				);
			}
			if (debugValues) {
				console.log("\told", value1);
				console.log("\tnew", value2);
			}
			return false;
		}
	}
	return true;
};

function clearAllProps(obj) {
	if (typeof obj !== "object" || obj === null) {
		throw new Error("Invalid input: Expected an object.");
	}

	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			obj[key] = ""; // 將屬性值設為空字串，或設為其他預設值
		}
	}
}

function toArray(obj, original = null, defaultValue = null) {
	if (!obj || typeof obj !== "object") {
		throw new Error("obj 必須是一個物件");
	}

	// 找出所有鍵並轉成數字，然後找出最大索引
	const keys = Object.keys(obj);
	if (keys.length === 0) {
		return original && Array.isArray(original) ? [...original] : [];
	}

	const indices = keys.map((k) => parseInt(k, 10)).filter((n) => !isNaN(n));
	const maxIndex = Math.max(...indices);

	// 建立目標陣列（長度為 maxIndex + 1）
	const result = new Array(maxIndex + 1);

	// 如果有提供 original，先把 original 的內容複製進來
	if (original != null) {
		if (Array.isArray(original)) {
			// original 是陣列，直接拷貝
			for (let i = 0; i < original.length && i < result.length; i++) {
				result[i] = original[i];
			}
		} else if (typeof original === "object") {
			// original 是物件（類似目前 obj 的結構），先轉成陣列再合併
			const temp = toArray(original, null, defaultValue); // 遞迴處理
			for (let i = 0; i < temp.length && i < result.length; i++) {
				result[i] = temp[i];
			}
		}
	}

	// 填入 defaultValue（只填還沒被 original 覆蓋的位置）
	for (let i = 0; i < result.length; i++) {
		if (result[i] === undefined) {
			result[i] = defaultValue;
		}
	}

	// 最後把 obj 的資料覆蓋到對應位置
	for (const key in obj) {
		const index = parseInt(key, 10);
		if (!isNaN(index)) {
			result[index] = obj[key];
		}
	}

	return result;
}

const Objects = {
	isAllPropsNullOrEmpty,
	isAllPropsNotNull,
	isAllPropsNull,
	isAllPropsEmpty,
	isAllPropsNotNullOrEmpty,
	hasAllProps,
	// isAllPropsEqual,
	isAnyPropNotEmpty,
	hasNoProps,
	hasAnyProp,
	arePropsEqual,
	isAllPropsNotEmpty,
	isAllPropsNotUndefined,
	clearAllProps,
	toArray,
};

export default Objects;
