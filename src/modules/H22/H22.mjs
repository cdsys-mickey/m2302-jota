const transformForSubmitting = (payload) => {
	const { outputType, SProdID, EProdID, counter, ...rest } = payload;
	return {
		JobName: "H22",
		Action: outputType?.id?.toString() || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		CaseID: counter?.CodeID || "",
		...rest,
	};
};

const H22 = {
	transformForSubmitting,
};

export default H22;
