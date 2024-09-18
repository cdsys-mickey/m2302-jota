/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";

const transformForGridImport = (data) => {
	return (
		data?.map((v) => ({
			Pkey: nanoid(),
			prod: {
				ProdID: v.SProdID,
				ProdData: v.SProdData_N,
			},
			SProdData_N: v.SProdData_N,
			SPackData_N: v.SPackData_N,
			SPrice: v.SPrice || null,
			Seq: v.Seq,
		})) || []
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
			QDate: QDate ? Forms.parseDate(QDate) : "",
			employee: {
				CodeID: QEmplID,
				CodeData: EmplData_N,
			},
			...rest,
		};
	});
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map((v, index) => ({
			Pkey: v.Pkey?.length < 36 ? "" : v.Pkey,
			SProdID: v.prod?.ProdID,
			SPrice: v.SPrice,
			// Seq: v.Seq,
			Seq: index + 1,
		}));
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

const transformForSubmitting = (payload, quoteGridData) => {
	const { InqID, InqDate, employee, supplier, remark } = payload;
	return Forms.processDateFieldsForSubmit(
		{
			InqID,
			InqDate,
			EmplID: employee?.CodeID || "",
			FactID: supplier?.FactID || "",
			...(quoteGridData && {
				FactInq_S: transformGridForSubmitting(quoteGridData),
			}),
		},
		"InqDate"
	);
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

const B011 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
};

export default B011;
