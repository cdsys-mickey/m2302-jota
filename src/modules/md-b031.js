/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/Forms.mjs";
import Strings from "../shared-modules/sd-strings";

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
		const { ProdID, ProdData_N, QEmplID, EmplData_N, QDate, ...rest } = v;
		return {
			prod: {
				ProdID,
				ProdData: ProdData_N,
			},
			ProdData_N,
			// QDate: Forms.reformatDateAsDash(QDate),
			QDate: QDate,
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
			return {
				// Pkey: Strings.containsNumberOnly(Pkey) ? Pkey : "",
				Pkey: v.Pkey?.length < 36 ? "" : v.Pkey,
				ProdID: v.prod ? v.prod.ProdID : "",
				QPrice: v.QPrice?.toString() || "",
				QDate: qdate || "",
				QEmplID: employeeId || "",
			};
		});
};

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		Date,
		B011031_W1,
		CustID,
		CustData_N,
		...rest
	} = payload;

	return {
		Date: Forms.parseDate(Date),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		customer: CustID
			? {
					CustID,
					CustData: CustData_N,
			  }
			: null,
		quotes: transformGridForReading(B011031_W1),
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
			B011031_W1: transformGridForSubmitting(gridData, qdate, employeeId),
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
			B011031_W1: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {
		emp: data.emp?.EmplID,
		emp2: data.emp2?.EmplID,
		cst: data.cust?.CustID,
		cst2: data.cust2?.CustID,
		prd: data.prod?.ProdID,
		prd2: data.prod2?.ProdID,
		dat: Forms.formatDate(data.date),
		dat2: Forms.formatDate(data.date2),
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

const B031 = {
	transformForReading,
	transformForCreating,
	transformForUpdating,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformProdCriteriaAsQueryParams,
};

export default B031;
