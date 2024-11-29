/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";

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
			const { Pkey, prod, QPrice, QDate, employee, ...rest } = v;
			return {
				Pkey: /^\d+$/.test(Pkey) ? Pkey : "",
				ProdID: prod ? prod.ProdID : "",
				QPrice: QPrice?.toString() || "",
				QDate: qdate || QDate,
				QEmplID: employeeId || employee?.CodeID || "",
				...rest,
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
		dlgDate: Forms.parseDate(Date),
		dlgEmployee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		dlgCustomer: CustID
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
	const { dlgCustomer, dlgEmployee, dlgDate } = payload;

	const customerId = dlgCustomer?.CustID || "";
	const date = Forms.formatDate(dlgDate);
	const employeeId = dlgEmployee?.CodeID || "";

	return {
		CustID: customerId,
		QEmplID: employeeId,
		QDate: date,
		...(gridData && {
			B011031_W1: transformGridForSubmitting(gridData, date, employeeId),
		}),
	};
};

const transformForUpdating = (payload, gridData) => {
	const { dlgCustomer, dlgEmployee } = payload;
	return {
		CustID: dlgCustomer?.CustID || "",
		QEmplID: dlgEmployee?.CodeID || "",
		...(gridData && {
			B011031_W1: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {
		emp: data.lvEmployee?.CodeID,
		cst: data.lvCust?.CustID,
		dat: Forms.formatDate(data.lvDate),
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

const B011 = {
	transformForReading,
	transformForCreating,
	transformForUpdating,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformProdCriteriaAsQueryParams,
};

export default B011;
