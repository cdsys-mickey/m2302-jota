/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";
import FreeProdTypes from "./md-free-prod-types";
import Squared from "./md-squared";
import Strings from "@/shared-modules/sd-strings";

const createRow = () => ({
	Pkey: nanoid(),
	prod: null,
	ProdData_N: "",
	PackData_N: "",
	SQflag: "",
	SPrice: "",
	SOutQty: "",
	SQty: "",
	SAmt: "",
	stype: null,
	SRemark: "",
	SNotQty: "",
});

const SalesType = Object.freeze({
	// NONE: "",
	RETAIL: "Y",
	NORMAL: "N",
});

const salesTypeOptions = [
	// { id: SalesType.NONE, label: "不篩選" },
	{ id: SalesType.RETAIL, label: "零售" },
	{ id: SalesType.NORMAL, label: "正式客戶" },
];

const getSalesTypeOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getSalesTypeOptionById = (id) => {
	return salesTypeOptions.find((o) => o.id === id);
};

const findSalesTypeOptionByInput = (s) => {
	return salesTypeOptions.find(
		(o) => o.id?.toLowerCase() === s?.toLowerCase()
	);
};

const isSalesTypeOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const SquaredState = Object.freeze({
	NONE: "",
	NOT: "N",
	MARK_AS_SQUARED: "Y",
	SQUARED: "*",
});

const listSquaredOptions = [
	// { id: SquaredState.NONE, label: "不篩選" },
	{ id: SquaredState.NOT, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "結清" },
	{ id: SquaredState.SQUARED, label: "銷貨已結清" },
];

const squaredOptions = [
	{ id: SquaredState.NONE, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "結清" },
	{ id: SquaredState.SQUARED, label: "銷貨已結清" },
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

const isSquaredOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const getSquaredOptionDisabled = (option) => {
	return false;
};

const transformForGridImport = (data, employee, date) => {
	return (
		data?.map((v) => {
			const { ProdID, ProdData_N, PackData_N, Price_N } = v;
			return {
				Pkey: nanoid(),
				prod: {
					ProdID,
					ProdData: ProdData_N,
				},
				ProdData_N,
				PackData_N,
				Price: Price_N,
				employee: ProdID ? employee : null,
				QDate: ProdID ? date : null,
			};
		}) || []
	);
};

const getTooltip = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push(`庫存量（${stockQty || 0}）`);
		}

		if (!Strings.isNullOrEmpty(rowData?.OrdQty_N)) {
			const demandOfOtherRows = rowData.OrdQty_N;
			results.push(`目前訂購量（${demandOfOtherRows || 0}）`);
		}

		if (!Strings.isNullOrEmpty(rowData?.LaveQty_N)) {
			const remaining = rowData.LaveQty_N;
			results.push(`剩餘量（${remaining || 0}）`);
		}
	}
	const result = results.join(", ");
	console.log(`${getTooltip.name}`, result);
	return result;
};

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const {
				// prod
				SProdID,
				ProdData_N,
				PackData_N,

				// stype
				SType,

				...rest
			} = rowData;

			let processedRowData = {
				prod: SProdID
					? {
							ProdID: SProdID,
							ProdData: ProdData_N,
					  }
					: null,
				ProdData_N,
				PackData_N,
				stype: FreeProdTypes.getOptionById(SType),
				...rest,
			};

			processedRowData.tooltip = getTooltip({
				rowData: processedRowData,
				rowIndex,
			});

			return processedRowData;
		}) || []
	);
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map((v, index) => {
			const {
				Pkey,
				prod,
				SPrice,
				SQty,
				SAmt,
				stype,
				SNotQty,
				SOutQty,
				...rest
			} = v;
			return {
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod ? prod.ProdID : "",
				SQty: SQty?.toString() || "",
				SPrice: SPrice?.toString() || "",
				SAmt: SAmt?.toString() || "",
				SType: stype?.id || "",
				SNotQty: SNotQty?.toString() || "",
				SOutQty: SOutQty?.toString() || "",
				Seq: index + 1,
				...rest,
			};
		});
};

const getTransType = (data) => {
	const { TrafID, TrafData_N } = data || {};
	if (!TrafID) {
		return null;
	}
	return {
		CodeID: TrafID,
		CodeData: TrafData_N,
	};
};

const getTaxExcluded = (data) => {
	const { TaxType } = data || {};
	return TaxType === "Y";
};

const getRetail = (data = {}) => {
	const { SalType } = data;
	return SalType === "Y";
};

const getPaymentType = (data) => {
	const { RecvID, RecvData_N } = data || {};
	if (!RecvID) {
		return null;
	}
	return {
		CodeID: RecvID,
		CodeData: RecvData_N,
	};
};

const getEmployee = (data) => {
	const { EmplID, EmplData_N } = data || {};
	if (!EmplID) {
		return null;
	}
	return {
		CodeID: EmplID,
		CodeData: EmplData_N,
	};
};

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		ArrDate,
		OrdDate,
		CFlag,
		SalType,
		CustID,
		CustName,
		RecvID,
		RecvData_N,
		TaxType,
		TrafID,
		TrafData_N,
		PrtAmt,
		SaleOrd_S,
		Remark,
		...rest
	} = payload;

	return {
		OrdDate: Forms.parseDate(OrdDate),
		ArrDate: Forms.parseDate(ArrDate),
		squared: getSquaredOptionById(CFlag),
		retail: getRetail({ SalType }),
		customer: CustID
			? {
					CustID,
					CustData: CustName,
			  }
			: null,
		CustName,
		paymentType: getPaymentType({ RecvID, RecvData_N }),
		employee: getEmployee({ EmplID, EmplData_N }),
		transType: getTransType({ TrafID, TrafData_N }),
		taxExcluded: getTaxExcluded({ TaxType }),
		dontPrtAmt: PrtAmt === "N",
		prods: transformGridForReading(SaleOrd_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const {
		OrdDate,
		ArrDate,
		squared,
		retail,
		customer,
		CustName,
		paymentType,
		employee,
		transType,
		dontPrtAmt,
		taxExcluded,
		remark,
		...rest
	} = payload;

	return {
		OrdDate: Forms.formatDate(OrdDate),
		ArrDate: Forms.formatDate(ArrDate),
		CFlag: squared?.id || "",
		SalType: retail ? "Y" : "",
		CustID: customer?.CustID || "",
		CustName,
		RecvID: paymentType?.CodeID || "",
		EmplID: employee?.CodeID || "",
		PrtAmt: dontPrtAmt ? "N" : "Y",
		Remark: remark.split("\n"),
		TrafID: transType?.CodeID || "",
		TaxType: taxExcluded ? "Y" : "",
		...rest,
		...(gridData && {
			SaleOrd_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformSquared = (value) => {
	switch (value?.toUpperCase()) {
		case "N":
			return "";
		case "":
			return null;
		default:
			return value?.toUpperCase();
	}
};

const transformSalesType = (value) => {
	switch (value?.toUpperCase()) {
		case "N":
			return 0;
		case "Y":
			return 1;
		case "":
		default:
			return null;
	}
};

const transformAsQueryParams = (data) => {
	console.log("transformAsQueryParams", data);
	const squared = transformSquared(data.squared?.id);

	const salesTypes = transformSalesType(data.salesType?.id);
	return {
		q: data.q,
		ordDate: Forms.formatDate(data.ordDate),
		arrDate: Forms.formatDate(data.arrDate),
		...(squared != null && {
			cflag: squared,
		}),
		// squared: transformSquared(data.squared?.id),
		...(salesTypes != null && {
			retail: salesTypes,
		}),
		cust: data.cust?.CustID,
		custName: data.custName,
		compTel: data.compTel,
		employee: data.employee?.CodeID,
	};
};

const transformProdCriteriaAsQueryParams = (data) => {
	return {
		pi: data.sprod?.ProdID,
		pi2: data.eprod?.ProdID,
		pn: data.prodName,
		cl: data.catL?.LClas,
		cm: data.catM?.MClas,
		cs: data.catS?.SClas,
		ta: data.typeA?.id,
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

const E01 = {
	createRow,
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformProdCriteriaAsQueryParams,
	// 結清
	SquaredState,
	listSquaredOptions,
	squaredOptions,
	getSquaredOptionLabel,
	getSquaredOptionById,
	getSquaredOptionDisabled,
	findSquaredOptionByInput,
	isSquaredOptionEqualToValue,
	// 零售
	SalesType,
	salesTypeOptions,
	getSalesTypeOptionLabel,
	getSalesTypeOptionById,
	findSalesTypeOptionByInput,
	isSalesTypeOptionEqualToValue,
	getTransType,
	getTaxExcluded,
	getPaymentType,
	getEmployee,
	getTotal,
	getTooltip,
};

export default E01;
