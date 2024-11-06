/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";

const transformForGridImport = (data) => {
	return (
		data?.map((v) => {
			const { CustID, CustData_N, Price_N } = v;
			return {
				Pkey: nanoid(),
				customer: {
					CustID,
					CustData: CustData_N,
				},
				CustData_N,
				Price: Price_N,
			};
		}) || []
	);
};

const transformGridForReading = (data) => {
	return data?.map((v) => {
		const { CustID, CustData_N, QEmplID, EmplData_N, QDate, ...rest } = v;
		return {
			customer: {
				CustID,
				CustData: CustData_N,
			},
			CustData_N,
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
		.filter((v) => v.customer?.CustID)
		.map((v) => {
			const { Pkey, customer, QPrice, QDate, employee } = v;
			return {
				Pkey: /^\d+$/.test(Pkey) ? Pkey : "",
				CustID: customer ? customer.CustID : "",
				QPrice: QPrice,
				QDate: qdate || QDate,
				QEmplID: employeeId || employee?.CodeID || "",
			};
		});
};

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		Date,
		B012032_W1,
		ProdID,
		ProdData_N,
		...rest
	} = payload;

	return {
		dlgDate: Forms.parseDate(Date),
		dlgEmployee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		dlgProd: ProdID
			? {
					ProdID,
					ProdData: ProdData_N,
			  }
			: null,
		quotes: transformGridForReading(B012032_W1),
		...rest,
	};
};

const transformForCreating = (payload, gridData) => {
	const { dlgProd, dlgEmployee, dlgDate } = payload;

	const prodId = dlgProd?.ProdID || "";
	const date = Forms.formatDate(dlgDate);
	const employeeId = dlgEmployee?.CodeID || "";

	return {
		ProdID: prodId,
		QEmplID: employeeId,
		QDate: date,
		...(gridData && {
			B012032_W1: transformGridForSubmitting(gridData, date, employeeId),
		}),
	};
};

const transformForUpdating = (payload, gridData) => {
	const { dlgProd, dlgEmployee } = payload;
	return {
		ProdID: dlgProd?.ProdID || "",
		QEmplID: dlgEmployee?.CodeID || "",
		...(gridData && {
			B012032_W1: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {
		prd: data.lvProd?.ProdID,
		emp: data.lvEmployee?.CodeID,
		dat: Forms.formatDate(data.lvDate),
	};
};

const transformCustCriteriaAsQueryParams = (data) => {
	return {
		cst: data.cust?.CustID,
		cst2: data.cust2?.CustID,
		chn: data.channel?.CodeID,
		are: data.area?.CodeID,
	};
};

const B012 = {
	transformForReading,
	transformForCreating,
	transformForUpdating,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformCustCriteriaAsQueryParams,
};

export default B012;
