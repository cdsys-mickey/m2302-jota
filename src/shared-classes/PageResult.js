class PageResult {
	constructor(totalElements, size) {
		this.totalElements = totalElements;
		this.size = size;
		this.totalPages = this.getTotalPages(totalElements, size);
	}

	static of(totalElements, size) {
		return new PageResult(totalElements, size);
	}

	static from(pageResult) {
		return new PageResult(pageResult.totalElements, pageResult.size);
	}

	getTotalPages = (totalElements, size) => {
		return Math.floor((totalElements + size - 1) / size);
	};

	/**
	 * 回傳一個兩個素的陣列, 分別包含起始和結束
	 * @param {int} page
	 * @returns
	 */
	getRange = (page) => {
		const begin = this.getStartingItemNumber(page);
		const end = begin + this.getNumberOfElements(page) - 1;
		return [begin, end];
	};

	getStartingItemNumber = (page) => {
		if (page < 1) return 0;
		return (page - 1) * this.size + 1;
	};

	/**
	 * 取得 page 所在的物件個數
	 * @param {int} page
	 * @returns
	 */
	getNumberOfElements(page) {
		if (page < 1) return 0;
		return this.totalPages > 0 && page < this.totalPages
			? this.size
			: this.totalElements % this.size;
	}

	asObject = (page) => {
		const obj = {
			totalElements: this.totalElements,
			size: this.size,
			totalPages: this.totalPages,
		};
		if (page !== undefined) {
			return {
				...obj,
				page,
				numberOfElements: this.getNumberOfElements(page),
			};
		}
		return obj;
	};

	forPage = (page) => {
		return this.asObject(page);
	};

	hasPrev = (page) => {
		return page > 1;
	};

	hasNext = (page) => {
		return page < this.totalPages;
	};

	toString = () => {
		return JSON.stringify(this.asObject());
	};

	getIndexNumber = (index, page) => {
		if (index < 0 || page < 1 || this.size < 1) {
			return 0;
		}
		return this.size * (page - 1) + index;
	};
}

export default PageResult;
