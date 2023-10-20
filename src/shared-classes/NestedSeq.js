class NestedSeq {
	constructor() {
		this.seqMap = [0];
		this.currentLevel = 0;
	}

	getNext = (level) => {
		// if (!level) {
		// 	throw new Error("level is not specified");
		// }
		//都算至第 0 階
		if (level > this.seqMap.length) {
			//補齊與最末位之間的 seq
			for (let i = 0; i < level - this.seqMap.length; i++) {
				this.seqMap.push(1);
			}
		}

		if (level < this.currentLevel) {
			//清除 level 之後的階層
			this.seqMap = this.seqMap.filter((i, index) => index <= level);
		}

		this.currentLevel = level;

		const current = this.seqMap[level];
		if (current) {
			this.seqMap[level] = current + 1;
		} else {
			this.seqMap[level] = 1;
		}

		return this.seqMap[level];
	};

	reset = () => {
		this.seqMap = [0];
	};

	getMap = () => {
		return this.seqMap;
	};

	toString = () => {
		return this.seqMap.join(", ");
	};
}

export default NestedSeq;
