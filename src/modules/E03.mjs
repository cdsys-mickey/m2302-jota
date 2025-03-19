/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/Forms.mjs";
import FreeProdTypes from "./md-free-prod-types";

const createRow = () => ({
	Pkey: nanoid(),
	prod: null,
	ProdData_N: "",
	PackData_N: "",
	SQflag: "",
	SPrice: "",
	SQty: "",
	SAmt: "",
	stype: null,
	dtype: null,
	SRemark: "",
});

const SalesType = Object.freeze({
	NONE: "",
	RETAIL: "Y",
	NORMAL: "N",
});

const salesTypeOptions = [
	{ id: SalesType.NONE, label: "不篩選" },
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

const squaredOptions = [
	{ id: SquaredState.NONE, label: "不篩選" },
	{ id: SquaredState.NOT, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "已結清" },
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

const transformGridForReading = (data) => {
	return data?.map((rowData, rowIndex) => {
		const {
			Pkey,
			ProdData_N,
			PackData_N,
			SAmt,
			SPrice,
			SProdID,
			SQflag,
			SQty,
			SQtyNote,
			SRemark,
			SType,
			SRsnID,
			RsnData_N,
			Seq,
			...rest
		} = rowData;
		let processedRowData = {
			Pkey,
			prod: SProdID
				? {
						ProdID: SProdID,
						ProdData: ProdData_N,
				  }
				: null,
			ProdData_N,
			PackData_N,
			SQflag,
			SPrice,
			SQtyNote,
			SQty,
			SAmt,
			stype: FreeProdTypes.getOptionById(SType),
			dtype: getDType({ SRsnID, RsnData_N }),
			SRemark,
			Seq,
			...rest,
		};

		processedRowData.tooltip = getTooltips({
			rowData: processedRowData,
			rowIndex,
		});

		return processedRowData;
	});
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map((v, index) => {
			const { Pkey, prod, SPrice, SQty, SAmt, stype, dtype, ...rest } = v;
			return {
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod ? prod.ProdID : "",
				SQty: SQty?.toString() || "",
				SPrice: SPrice?.toString() || "",
				SAmt: SAmt?.toString() || "",
				SType: stype?.id || "",
				SRsnID: dtype?.CodeID || "",
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

const getDType = (data) => {
	const { SRsnID, RsnData_N } = data || {};
	if (!SRsnID) {
		return null;
	}
	return {
		CodeID: SRsnID,
		CodeData: RsnData_N,
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

const getDeliveryEmployee = (data) => {
	const { DyEmplID, DyEmplData_N } = data || {};
	if (!DyEmplID) {
		return null;
	}
	return {
		CodeID: DyEmplID,
		CodeData: DyEmplData_N,
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

const getTooltip = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (rowData.SOrdID) {
			results.push(
				`訂貨單號: ${
					rowData.SOrdID.includes("#")
						? rowData.SOrdID.split("#")[0]
						: rowData.SOrdID || ""
				}`
			);
		}
	}
	const result = results.join(", ");
	console.log(`${getTooltip.name}`, result);
	return result;
};

const getTooltips = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (rowData.SOrdID) {
			results.push({
				label: `訂貨單號`,
				value: rowData.SOrdID.includes("#")
					? rowData.SOrdID.split("#")[0]
					: rowData.SOrdID || "",
			});
		}
	}
	console.log(`${getTooltips.name}`, results);
	return results;
};

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		RetDate,
		SalType,
		CustID,
		CustName,
		RecvID,
		RecvData_N,
		TaxType,
		TrafID,
		TrafData_N,
		SaleRet_S,
		Remark,
		...rest
	} = payload;

	return {
		RetDate: Forms.parseDate(RetDate),
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
		prods: transformGridForReading(SaleRet_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const {
		RetDate,
		retail,
		customer,
		CustName,
		paymentType,
		employee,
		transType,
		taxExcluded,
		remark,
		...rest
	} = payload;

	return {
		RetDate: Forms.formatDate(RetDate) || "",
		SalType: retail ? "Y" : "",
		CustID: customer?.CustID || "",
		CustName,
		RecvID: paymentType?.CodeID || "",
		EmplID: employee?.CodeID || "",
		Remark: remark.split("\n"),
		TrafID: transType?.CodeID || "",
		TaxType: taxExcluded ? "Y" : "",
		...rest,
		...(gridData && {
			SaleRet_S: transformGridForSubmitting(gridData),
		}),
	};
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

	const salesTypes = transformSalesType(data.salesType?.id);
	return {
		q: data.q,
		rdate: Forms.formatDate(data.returnDate),
		...(salesTypes != null && {
			retail: salesTypes,
		}),
		cust: data.cust?.CustID,
		...(data.custName && {
			custName: data.custName,
		}),
		...(data.compTel && {
			compTel: data.compTel,
		}),
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

const E03 = {
	createRow,
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformProdCriteriaAsQueryParams,
	// 結清
	SquaredState,
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
	getTooltips,
};

export default E03;
