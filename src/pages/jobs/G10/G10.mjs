/* eslint-disable no-mixed-spaces-and-tabs */

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((x) => x.doc?.SDocID)
		.map((x) => {
			const { doc } = x;
			return {
				SDocID: doc?.SDocID,
			};
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

const G10 = {
	transformGridForSubmitting,
	transformForSubmitting,
	createRow,
};

export default G10;
