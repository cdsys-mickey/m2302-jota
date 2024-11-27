/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";
import FreeProdTypes from "./md-free-prod-types";

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, SType, ...rest }) => {
			return {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				stype: FreeProdTypes.getOptionById(SType),
				...rest,
			};
		}) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.prod?.ProdID)
		.map(
			(
				{
					Pkey,
					prod,
					SQty,
					SInQty,
					SNotQty,
					SPrice,
					SAmt,
					stype,
					...rest
				},
				index
			) => ({
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod?.ProdID,
				ProdData_N: prod?.ProdData,
				SQty: SQty?.toString() || "",
				SInQty: SInQty?.toString() || "",
				SNotQty: SNotQty?.toString() || "",
				SPrice: SPrice?.toString() || "",
				SAmt: SAmt?.toString() || "",
				SType: stype?.id || "",
				Seq: index + 1,
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const {
		OrdDate,
		ArrDate,
		CFlag,
		EmplID,
		EmplData_N,
		OrdDeptID,
		OrdDeptName_N,
		SpDeptID,
		SpDeptName_N,
		TxoID,
		TxiID,
		DepOrd_S,
		Remark,
		...rest
	} = payload;

	return {
		OrdDate: Forms.parseDate(OrdDate),
		ArrDate: Forms.parseDate(ArrDate),
		squared: getSquaredOptionById(CFlag),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		ordDept: {
			DeptID: OrdDeptID,
			AbbrName: OrdDeptName_N,
		},
		spDept: {
			DeptID: SpDeptID,
			AbbrName: SpDeptName_N,
		},
		TxoID,
		transOutOrders:
			TxoID?.split("|")
				.filter((s) => !!s)
				.map((x) => ({
					["撥出單號"]: x,
				})) || [],
		transInOrders:
			TxiID?.split("|")
				.filter((s) => !!s)
				.map((x) => ({
					["撥入單號"]: x,
				})) || [],
		prods: transformGridForReading(DepOrd_S),
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
		ordDept,
		spDept,
		squared,
		remark,
		// OMIT
		prod,
		stype,
		...rest
	} = payload;

	console.log("omit", prod, stype);

	return {
		OrdID,
		OrdDate: OrdDate ? Forms.formatDate(OrdDate) : "",
		ArrDate: ArrDate ? Forms.formatDate(ArrDate) : "",
		EmplID: employee?.CodeID || "",
		CFlag: squared?.id || "",
		OrdDeptID: ordDept?.DeptID || "",
		SpDeptID: spDept?.DeptID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			DepOrd_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { taxType, supplier, rd, employee, ...rest } = data;
	return {
		...rest,
		...(taxType?.id && {
			tt: taxType?.id,
		}),
		...(supplier?.FactID && {
			spi: supplier.FactID,
		}),
		...(employee && {
			emi: employee.CodeData,
		}),
		rd: Forms.formatDate(rd),
	};
};

const getTotal = (gridData) => {
	if (!gridData) {
		return 0;
	}
	let result = 0;
	for (const rowData of gridData) {
		const { SAmt } = rowData;
		result += SAmt ? Number(SAmt) : 0;
	}
	return result;
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"supplier,spn,spa,spu,rd,employee,tt"
	);
};

// 結清
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

const findSquaredOptionByInput = (s) => {
	return squaredOptions.find((o) => o.id?.toLowerCase() === s?.toLowerCase());
};

const getSquaredOptionDisabled = (option) => {
	return option.id === SquaredState.SQUARED;
};

const stringifyOrders = (orders) => {
	return orders
		? orders
				.map((o) => o?.["撥出單號"])
				.filter((x) => !!x)
				.join(", ")
		: "";
};

const C06 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	// 結清
	SquaredState,
	squaredOptions,
	getSquaredOptionLabel,
	getSquaredOptionById,
	getSquaredOptionDisabled,
	findSquaredOptionByInput,
	stringifyOrders,
};

export default C06;
