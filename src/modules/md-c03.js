/* eslint-disable no-mixed-spaces-and-tabs */
import { milliseconds } from "date-fns";
import Forms from "../shared-modules/sd-forms";

const SquaredState = Object.freeze({
	NONE: "",
	MARK_AS_SQUARED: "Y",
	SQUARED: "*",
});

const squaredOptions = [
	{ id: SquaredState.NONE, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "註記結清" },
	{ id: SquaredState.SQUARED, label: "已結清" },
];

const getSquaredOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getSquaredOptionById = (id) => {
	return squaredOptions.find((o) => o.id === id);
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

const transformForGrid = (data) => {
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

const transformForReading = (payload) => {
	const {
		OrdDate,
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
		squared: CFlag ? getSquaredOptionById(CFlag) : null,
		prods: transformForGrid(GdsOrd_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { OrdID, OrdDate, employee, supplier, squared, remark, ...rest } =
		payload;
	return {
		OrdID,
		OrdDate,
		...rest,
		FactID: supplier?.FactID || "",
		EmplID: employee?.CodeID || "",
		CFlag: squared?.id || "",
		Remark: remark?.split("\n") || [],
		...(gridData && {
			GdsOrd_S: gridData
				.filter((v) => v.prod?.ProdID)
				.map(({ Pkey, prod, SPrice, SQty, SAmt }, index) => ({
					Pkey: Pkey?.length < 36 ? "" : Pkey,
					SProdID: prod?.ProdID,
					SPrice,
					SQty,
					SAmt,
					Seq: index + 1,
				})),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {};
};

const C03 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGrid,
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
};

export default C03;
