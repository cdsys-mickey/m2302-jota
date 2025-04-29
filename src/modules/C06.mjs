/* eslint-disable no-mixed-spaces-and-tabs */
import Strings from "@/shared-modules/sd-strings";
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects";
import FreeProdTypes from "./md-free-prod-types";

const getTooltip = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push(`庫存量(${stockQty || 0})`);
		}
	}
	const result = results.join(", ");
	console.log(`${getTooltip.name}`, result);
	return result;
};

const getTooltips = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push({
				label: `庫存量`,
				value: stockQty ?? 0,
			});
			if (rowData?.SafeQty_N) {
				const safety = Number(rowData?.SafeQty_N) || 0;

				const value = safety > 0 ? stockQty - safety : stockQty;
				if (stockQty < (safety > 0 ? safety : 0)) {
					results.push({
						label: `低於安存量`,
						value: value,
					});
				}
			}
		}
	}
	console.log(`${getTooltips.name}`, results);
	return results;
};

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const { SProdID, ProdData_N, SType, ...rest } = rowData;
			let processedRowData = {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				stype: FreeProdTypes.getOptionById(SType),
				...rest,
			};
			processedRowData.tooltip = getTooltips({
				rowData: processedRowData,
				rowIndex,
			});

			return processedRowData;
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
	const { shdept, orddate, arrdate, employee, squared, ...rest } = data;
	return {
		...rest,
		...(employee && {
			employee: employee.CodeID,
		}),
		...(shdept && {
			shdept: shdept.DeptID,
		}),
		orddate: Forms.formatDate(orddate),
		arrdate: Forms.formatDate(arrdate),
		...(squared && {
			squared: squared.id,
		}),
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

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

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
	getTooltip,
	getTooltips,
	isOptionEqualToValue,
};

export default C06;
