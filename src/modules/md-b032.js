/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";
import Strings from "@/shared-modules/sd-strings";

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
		.filter((v) => v.customer?.CustID)
		.map((v) => {
			const { Pkey, customer, QPrice } = v;
			return {
				// Pkey: Strings.containsNumberOnly(Pkey) ? Pkey : "",
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				CustID: customer ? customer.CustID : "",
				QPrice: QPrice?.toString() || "",
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
		B012032_W1,
		ProdID,
		ProdData_N,
		...rest
	} = payload;

	return {
		Date: Forms.parseDate(Date),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		prod: ProdID
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
	const { prod, employee, Date } = payload;

	const qdate = Forms.formatDate(Date);
	const employeeId = employee?.CodeID || "";

	return {
		ProdID: prod?.ProdID || "",
		QEmplID: employeeId,
		QDate: qdate,
		...(gridData && {
			B012032_W1: transformGridForSubmitting(gridData, qdate, employeeId),
		}),
	};
};

const transformForUpdating = (payload, gridData) => {
	const { prod, employee, Date } = payload;
	return {
		ProdID: prod?.ProdID || "",
		QEmplID: employee?.CodeID || "",
		QDate: Forms.formatDate(Date),
		...(gridData && {
			B012032_W1: transformGridForSubmitting(gridData),
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

const transformCustCriteriaAsQueryParams = (data) => {
	return {
		cst: data.cust?.CustID,
		cst2: data.cust2?.CustID,
		chn: data.channel?.CodeID,
		are: data.area?.CodeID,
	};
};

const B032 = {
	transformForReading,
	transformForCreating,
	transformForUpdating,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformCustCriteriaAsQueryParams,
};

export default B032;
