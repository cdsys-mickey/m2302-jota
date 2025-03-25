const DEFAULT_OPTS = {
	select: true,
};

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
	const { includeComments = false } = opts;
	let result = input
		.trim()
		.split(/\s*,\s*(?![^{]*\})/)
		.filter(Boolean);

	//  為了能夠分析下面的字串, 包含欄位名稱後面的 JSON, 會帶到 field 定義
	//  `
	// 	ac,
	// 	pw,
	// 	rememberMe:{skipEnter: true},
	// 	captcha
	// 	`

	// 排除 comment 項目
	if (!includeComments) {
		result = result.filter((item) => !item.startsWith("//"));
	}
	return result.map((item) => {
		// console.log("item→", item);
		const [name, extra] = item.split(/\s*:\s*(?=\{)/);
		// console.log("name→", name);
		// console.log("extra→", extra);
		if (extra) {
			let extraObj = null;
			try {
				extraObj = JSON.parse(addDoubleQuotesToObjectKeys(extra));
			} catch (err) {
				console.error(`failed to parse extra props for "${name}"`, err);
			}
			return {
				name: name,
				...DEFAULT_OPTS,
				...extraObj,
			};
		} else {
			return { name: name, ...DEFAULT_OPTS };
		}
	});
};

const FormMeta = {
	parse,
};

export default FormMeta;
