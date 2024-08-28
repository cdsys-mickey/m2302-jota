const transformForReading = (payload) => {
	if (!payload.data) {
		return [];
	}
	return payload.data[0][`A22_W1`].map((v) => ({
		prod: {
			ProdID: v.ProdID,
			ProdData: v.ProdData,
			Barcode: v.Barcode,
			PackData: v.PackData,
		},
		ProdData: v.ProdData,
		Barcode: v.Barcode,
		Qty: v.Qty,
		PackData: v.PackData,
	}));
};

const transformAsQueryParams = (data) => {
	const { prod1, prod2, catL, catM, catS, ...rest } = data;
	return {
		pi1: prod1?.ProdID || "",
		pi2: prod2?.ProdID || "",
		// ctn: ctn,
		ctl: catL?.LClas || "",
		ctm: catM?.MClas || "",
		cts: catS?.SClas || "",
		...rest,
	};
};

const transformForSubmitting = (gridData, data) => {
	return {
		Action: data?.outputType?.id || "1",
		JobName: "A22",
		A22_W1: gridData
			.filter((i) => {
				const { prod } = i;
				return !!prod;
			})
			.map((i) => {
				const { prod, ...rest } = i;
				return {
					ProdID: prod.ProdID,
					ProdData: prod.ProdData,
					Barcode: prod.Barcode,
					PackData: prod.PackData,
					...rest,
				};
			}),
	};
};

const A22 = {
	transformAsQueryParams,
	transformForReading,
	transformForSubmitting,
};

export default A22;
