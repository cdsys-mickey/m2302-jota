/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects.mjs";
import FreeProdTypes from "./md-free-prod-types";
import Squared from "./md-squared";

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
		.map(({ Pkey, prod, SQty, SPrice, SAmt, stype, ...rest }, index) => ({
			Pkey: Pkey?.length < 36 ? "" : Pkey,
			SProdID: prod?.ProdID,
			ProdData_N: prod?.ProdData,
			SQty: SQty?.toString() || "",
			SPrice: SPrice?.toString() || "",
			SAmt: SAmt?.toString() || "",
			SType: stype?.id || "",
			Seq: index + 1,
			...rest,
		}));
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
		TxoID,
		TxiID,
		DepOrd_S,
		Remark,
		...rest
	} = payload;

	return {
		OrdDate: Forms.parseDate(OrdDate),
		ArrDate: Forms.parseDate(ArrDate),
		squared: Squared.getSquaredOptionById(CFlag),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		ordDept: {
			DeptID: OrdDeptID,
			AbbrName: OrdDeptName_N,
		},
		TxoID,
		transOutOrders:
			TxoID?.split(/[|,]/)
				.filter((s) => !!s)
				.map((x) => ({
					["撥出單號"]: x,
				})) || [],
		transInOrders:
			TxiID?.split(/[|,]/)
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
	const { OrdID, OrdDate, employee, supplier, remark, ...rest } = payload;
	return {
		OrdID,
		OrdDate: OrdDate ? Forms.formatDate(OrdDate) : "",
		EmplID: employee?.CodeID || "",
		FactID: supplier?.FactID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			GdsRt_S: transformGridForSubmitting(gridData),
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

const transformAsQueryParams = (data) => {
	const { squared, arrDate, ordDate, employee, ordDept, ...rest } = data;
	return {
		...(squared && {
			sf: squared.id,
		}),
		...(ordDept && {
			odp: ordDept.DeptID,
		}),
		...(employee && {
			emp: employee.CodeID,
		}),
		...(ordDate && {
			od: Forms.formatDate(ordDate),
		}),
		...(arrDate && {
			ad: Forms.formatDate(arrDate),
		}),
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"ordDate,arrDate,ordDept,employee,squared"
	);
};

const stringifyOrders = (orders) => {
	return orders
		? orders
				.map((o) => o?.["撥出單號"])
				.filter((x) => !!x)
				.join(", ")
		: "";
};

const C07 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	stringifyOrders,
};

export default C07;
