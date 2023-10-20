import NestedSeq from "@/shared-classes/NestedSeq";

class DigitSeq extends NestedSeq {
	getLevelText = (level) => {};

	formatItem = (v) => {
		return String(v).padStart(2, "0");
	};

	getNextLevelText = (level) => {
		let result = "";
		// if (!level) {
		// 	return result;
		// }
		const nextNum = this.getNext(level || 0);
		for (let i = 0; i < level; i++) {
			result = result.concat(this.formatItem(this.seqMap[i]));
		}
		result = result.concat(this.formatItem(nextNum));

		return result;
	};
}

export default DigitSeq;
