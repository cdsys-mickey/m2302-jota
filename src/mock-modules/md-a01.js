const hasEmptyError = (criteria) => {
	if (criteria.q) {
		return false;
	}
	return true;
};

const processForDefaultSubmit = (data) => {
	let collected;

	collected = {
		p: data.qs,
	};

	return collected;
};

const processForSubmit = (data) => {
	return data;
};

const isFiltered = (criteria) => {
	return false;
};

const A01 = {
	hasEmptyError,
	processForDefaultSubmit,
	processForSubmit,
	isFiltered,
};

export default A01;
