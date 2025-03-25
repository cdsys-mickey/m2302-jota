// 將物件屬性名用雙引號包圍的函數，並確保已有雙引號的屬性名不受影響
function addDoubleQuotesToObjectKeys(str) {
	return str.replace(/(\w+)\s*:/g, function (match, p1) {
		return `"${p1}":`;
	});
}

/**
 * @param {*} input
 * @param {*} opts
 * @returns
 */
const parse = (input, opts = {}) => {
	const { includeComments = false, defaultProps } = opts;

	if (!input) {
		return {};
	}

	let result = input
		.trim()
		.split(/\s*,\s*(?![^{]*\})/)
		.filter(Boolean);

	// 排除 comment 項目
	if (!includeComments) {
		result = result.filter((item) => !item.startsWith("//"));
	}

	// 使用 reduce 將陣列轉為物件
	return result.reduce((acc, item) => {
		const [name, extra] = item.split(/\s*:\s*(?=\{)/);

		if (extra) {
			let extraObj = null;
			try {
				extraObj = JSON.parse(addDoubleQuotesToObjectKeys(extra));
			} catch (err) {
				console.error(`failed to parse extra props for "${name}"`, err);
			}
			// 以 name 作為 key，剩餘屬性作為 value
			acc[name] = {
				...defaultProps,
				...extraObj,
			};
		} else {
			// 沒有 extra 的情況，只使用 defaultProps 作為 value
			acc[name] = { ...defaultProps };
		}
		return acc;
	}, {});
};

const Fields = {
	parse,
};

export default Fields;
