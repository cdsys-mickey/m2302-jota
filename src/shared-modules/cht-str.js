/**
 * 將兩位數字轉為中文字串
 */
const fromNumber = (num) => {
	num = Number(num);
	var upperCaseNumber = [
		"零",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九",
		"十",
		"百",
		"千",
		"萬",
		"億",
	];
	var length = String(num).length;
	if (length === 1) {
		return upperCaseNumber[num];
	} else if (length === 2) {
		if (num === 10) {
			return upperCaseNumber[num];
		} else if (num > 10 && num < 20) {
			return "十" + upperCaseNumber[String(num).charAt(1)];
		} else {
			return (
				upperCaseNumber[String(num).charAt(0)] +
				"十" +
				upperCaseNumber[String(num).charAt(1)].replace("零", "")
			);
		}
	}
};

/**
 *
 * @param {*} digit
 * @returns
 */
const fromLargeNumber = (digit) => {
	digit = typeof digit === "number" ? String(digit) : digit;
	const zh = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	const unit = ["千", "百", "十", ""];
	const quot = [
		"萬",
		"億",
		"兆",
		"京",
		"垓",
		"秭",
		"穰",
		"溝",
		"澗",
		"正",
		"載",
		"極",
		"恆河沙",
		"阿僧祗",
		"那由他",
		"不可思議",
		"無量",
		"大數",
	];
	let breakLen = Math.ceil(digit.length / 4);
	let notBreakSegment = digit.length % 4 || 4;
	let segment;
	let zeroFlag = [],
		allZeroFlag = [];
	let result = "";
	while (breakLen > 0) {
		if (!result) {
			// 第一次執行
			segment = digit.slice(0, notBreakSegment);
			let segmentLen = segment.length;
			for (let i = 0; i < segmentLen; i++) {
				if (segment[i] !== "0") {
					if (zeroFlag.length > 0) {
						result +=
							"零" + zh[segment[i]] + unit[4 - segmentLen + i];
						// 判斷是否需要加上 quot 單位
						if (i === segmentLen - 1 && breakLen > 1) {
							result += quot[breakLen - 2];
						}
						zeroFlag.length = 0;
					} else {
						result += zh[segment[i]] + unit[4 - segmentLen + i];
						if (i === segmentLen - 1 && breakLen > 1) {
							result += quot[breakLen - 2];
						}
					}
				} else {
					// 處理為 0 的情形
					if (segmentLen === 1) {
						result += zh[segment[i]];
						break;
					}
					zeroFlag.push(segment[i]);
					continue;
				}
			}
		} else {
			segment = digit.slice(notBreakSegment, notBreakSegment + 4);
			notBreakSegment += 4;
			for (let j = 0; j < segment.length; j++) {
				if (segment[j] !== 0) {
					if (zeroFlag.length > 0) {
						// 第一次執行zeroFlag長度不為0，說明上一個分割槽最後有0待處理
						if (j === 0) {
							result +=
								quot[breakLen - 1] + zh[segment[j]] + unit[j];
						} else {
							result += "零" + zh[segment[j]] + unit[j];
						}
						zeroFlag.length = 0;
					} else {
						result += zh[segment[j]] + unit[j];
					}
					// 判斷是否需要加上 quot 單位
					if (j === segment.length - 1 && breakLen > 1) {
						result += quot[breakLen - 2];
					}
				} else {
					// 第一次執行如果zeroFlag長度不為0, 且上一劃分不全為0
					if (
						j === 0 &&
						zeroFlag.length > 0 &&
						allZeroFlag.length === 0
					) {
						result += quot[breakLen - 1];
						zeroFlag.length = 0;
						zeroFlag.push(segment[j]);
					} else if (allZeroFlag.length > 0) {
						// 執行到最後
						if (breakLen === 1) {
							result += "";
						} else {
							zeroFlag.length = 0;
						}
					} else {
						zeroFlag.push(segment[j]);
					}
					if (
						j === segment.length - 1 &&
						zeroFlag.length === 4 &&
						breakLen !== 1
					) {
						// 如果執行到末尾
						if (breakLen === 1) {
							allZeroFlag.length = 0;
							zeroFlag.length = 0;
							result += quot[breakLen - 1];
						} else {
							allZeroFlag.push(segment[j]);
						}
					}
					continue;
				}
			}
			--breakLen;
		}
		return result;
	}
};

/**
 * 數字轉天干
 * @param {*} num
 * @returns
 */
const toCelestialStem = (num) => {
	const number = Number(num);
	switch (number) {
		case 1:
			return "甲";
		case 2:
			return "乙";
		case 3:
			return "丙";
		case 4:
			return "丁";
		case 5:
			return "戊";
		case 6:
			return "已";
		case 7:
			return "庚";
		case 8:
			return "辛";
		case 9:
			return "壬";
		case 10:
			return "癸";
		default:
			return "";
	}
};

/**
 * 半形轉全形
 */
const toFullWidth = (number) => {
	const str = String(number);
	var temp = "";
	for (var i = 0; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode <= 126 && charCode >= 33) {
			charCode += 65248;
		} else if (charCode === 32) {
			// 半形空白轉全形
			charCode = 12288;
		}
		temp = temp + String.fromCharCode(charCode);
	}
	return temp;
};

const ChtStr = {
	fromNumber,
	fromLargeNumber,
	toCelestialStem,
	toFullWidth,
};

export default ChtStr;
