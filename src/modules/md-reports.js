const addParam = (field, op, value) => {
	return {
		ShowName: field,
		OpCode: op,
		CondData: value,
	};
};

const Reports = {
	addParam,
};

export default Reports;
