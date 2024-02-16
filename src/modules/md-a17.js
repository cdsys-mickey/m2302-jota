/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (data) => {
	const { DeptID, DeptName_N, ...rest } = data;

	return {
		dept: DeptID
			? {
					DeptID,
					DeptName: DeptName_N,
			  }
			: null,
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { dept, ...rest } = payload;
	return {
		DeptID: dept?.DeptID || "",
		...rest,
	};
};

const A17 = {
	transformForReading,
	transformForEditorSubmit,
};

export default A17;
