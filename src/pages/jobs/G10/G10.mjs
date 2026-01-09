/* eslint-disable no-mixed-spaces-and-tabs */

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((x) => x.doc?.SDocID)
		.map((x) => {
			const { doc } = x;
			return doc;
		});
};

const transformForSubmitting = (formData, gridData) => {
	return {
		SalRetDoc_S: transformGridForSubmitting(gridData),
	};
};

const createRow = () => ({
	doc: null,
});

function expandInput(input) {
	if (!input) return input;

	// 1. 使用正規表達式拆分：開頭字母 (不分大小寫) 與 後方的數字
	const match = input.match(/^([a-zA-Z])(\d+)$/);

	if (!match) return input;

	const char = match[1].toLowerCase(); // 取得開頭字母並轉小寫
	const numPart = match[2]; // 取得數字部分
	let prefix = "";

	// 2. 判斷前綴代號
	if (char === "s") {
		prefix = "SAL";
	} else if (char === "r") {
		prefix = "SRT";
	} else {
		// 若開頭不為 s 或 r，直接回傳原輸入
		return input;
	}

	// 3. 補足長度：前綴 3 碼 + 數字部分補 0 至總長度 10 碼
	// 意即數字部分需要補到 7 位數 (10 - 3 = 7)
	const expandedNum = numPart.padStart(7, "0");

	return prefix + expandedNum;
}

const G10 = {
	transformGridForSubmitting,
	transformForSubmitting,
	createRow,
	expandInput,
};

export default G10;
