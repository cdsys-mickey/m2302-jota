/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";

const createRow = () => ({
	Pkey: nanoid(),
	prod: null,
	ProdData_N: "",
	PackData_N: "",
	Price: "",
	QPrice: "",
	QDate: null,
	employee: null,
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
	return data?.map((v) => {
		const { SProdID, ProdData_N, QEmplID, EmplData_N, QDate, ...rest } = v;
		return {
			prod: SProdID
				? {
						ProdID: SProdID,
						ProdData: ProdData_N,
				  }
				: null,
			ProdData_N,
			QDate: Forms.reformatDate(QDate),
			employee: {
				CodeID: QEmplID,
				CodeData: EmplData_N,
			},
			...rest,
		};
	});
};

const transformGridForSubmitting = (data, qdate, employeeId) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map((v) => {
			const { Pkey, prod, QPrice } = v;
			return {
				Pkey: /^\d+$/.test(Pkey) ? Pkey : "",
				ProdID: prod ? prod.ProdID : "",
				QPrice: QPrice,
				QDate: qdate || "",
				QEmplID: employeeId || "",
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
		SaleOrd_S,
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
		prods: transformGridForReading(SaleOrd_S),
		...rest,
	};
};

const transformForCreating = (payload, gridData) => {
	const { customer, employee, Date } = payload;

	const qdate = Forms.formatDate(Date);
	const employeeId = employee?.CodeID || "";

	return {
		CustID: customer?.CustID || "",
		QEmplID: employeeId,
		QDate: qdate,
		...(gridData && {
			E01031_W1: transformGridForSubmitting(gridData, qdate, employeeId),
		}),
	};
};

const transformForUpdating = (payload, gridData) => {
	const { customer, employee, Date } = payload;
	return {
		CustID: customer?.CustID || "",
		QEmplID: employee?.CodeID || "",
		QDate: Forms.formatDate(Date),
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
		ta: data.typeA?.TypeA,
	};
};

const E01 = {
	createRow,
	transformForReading,
	transformForCreating,
	transformForUpdating,
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
	// 零售
	SalesType,
	salesTypeOptions,
	getSalesTypeOptionLabel,
	getSalesTypeOptionById,
	findSalesTypeOptionByInput,
	getTransType,
	getTaxExcluded,
	getPaymentType,
	getEmployee,
};

export default E01;
