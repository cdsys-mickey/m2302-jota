/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const SquaredState = Object.freeze({
	NONE: "",
	MARK_AS_SQUARED: "Y",
	SQUARED: "*",
});

const squaredOptions = [
	{ id: SquaredState.NONE, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "結清" },
	{ id: SquaredState.SQUARED, label: "進貨已結清" },
];

const getSquaredOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getSquaredOptionById = (id) => {
	return squaredOptions.find((o) => o.id === id);
};

const getSquaredOptionDisabled = (option) => {
	return option.id === SquaredState.SQUARED;
};

const ListModes = Object.freeze({
	NOT_REVIEWED: 0,
	REVIEWED: 1,
	ALL: -1,
});

const options = [
	{ id: ListModes.NOT_REVIEWED, label: "待覆核" },
	{ id: ListModes.REVIEWED, label: "已覆核" },
	{ id: ListModes.ALL, label: "全部" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return `${label}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, ...rest }) => ({
			prod: {
				ProdID: SProdID,
				ProdData: ProdData_N,
			},

			...rest,
		})) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.prod?.ProdID)
		.map(({ Pkey, prod, ...rest }, index) => ({
			Pkey: Pkey?.length < 36 ? "" : Pkey,
			SProdID: prod?.ProdID,
			...rest,
			Seq: index + 1,
		}));
};

const transformForReading = (payload) => {
	const {
		OrdDate,
		ArrDate,
		EmplID,
		EmplData_N,
		FactID,
		FactData,
		GdsOrd_S,
		Remark,
		CFlag,
		...rest
	} = payload;

	return {
		OrdDate: Forms.parseDate(OrdDate),
		ArrDate: Forms.parseDate(ArrDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		supplier: FactID
			? {
					FactID: FactID,
					FactData: FactData,
			  }
			: null,
		FactData,
		squared: getSquaredOptionById(CFlag),
		prods: transformGridForReading(GdsOrd_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const {
		OrdID,
		OrdDate,
		ArrDate,
		employee,
		supplier,
		FactData,
		squared,
		remark,
		...rest
	} = payload;
	return {
		OrdID,
		OrdDate: Forms.formatDate(OrdDate),
		ArrDate: Forms.formatDate(ArrDate),
		FactID: supplier?.FactID || "",
		FactData: FactData,
		EmplID: employee?.CodeID || "",
		CFlag: squared?.id || "",
		Remark: remark?.split("\n") || [],
		...(gridData && {
			GdsOrd_S: transformGridForSubmitting(gridData),
		}),
		...rest,
	};
};

const transformAsQueryParams = (data) => {
	return {};
};

const getSubtotal = (gridData) => {
	let result = 0;
	for (const rowData of gridData) {
		const rowSubtotal = Number(rowData["SAmt"]);
		console.log(`rowSubtotal`, rowSubtotal);
		if (!isNaN(rowSubtotal)) {
			result += rowSubtotal;
		}
	}
	console.log("subtotal:", result);
	return result;
};

const C03 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	transformGridForSubmitting,
	// 覆核註記
	ListModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	// 結清
	SquaredState,
	squaredOptions,
	getSquaredOptionLabel,
	getSquaredOptionById,
	getSubtotal,
	getSquaredOptionDisabled,
};

export default C03;
