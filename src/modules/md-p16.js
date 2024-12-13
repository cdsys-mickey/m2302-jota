/* eslint-disable no-mixed-spaces-and-tabs */

const transformForReading = (payload) => {
	if (!payload.data) {
		return [];
	}
	return payload.data.map((i) => {
		const { DeptID, AbbrName_N, ...rest } = i;
		return {
			dept: DeptID
				? {
						DeptID: DeptID,
						AbbrName: AbbrName_N,
				  }
				: null,
			...rest,
		};
	});
};

const transformForSubmitting = (rowData) => {
	const { dept, ...rest } = rowData;
	return {
		DeptID: dept?.DeptID,
		...rest,
	};
};

const createRow = () => ({
	dept: null,
	Remark: "",
});

const P16 = {
	transformForReading,
	transformForSubmitting,
	createRow,
};

export default P16;
