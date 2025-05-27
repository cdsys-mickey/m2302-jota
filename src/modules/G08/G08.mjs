import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (payload) => {
	const { CustID, CustData_N, AdjDate, RsnData, ...rest } = payload;
	return {
		CustID: {
			CustID,
			CustData: CustData_N,
		},
		AdjDate: Forms.parseDate(AdjDate),
		RsnData: RsnData.join("\n"),
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { CustID, AdjDate, RsnData, ...rest } = payload;
	return {
		CustID: CustID?.CustID,
		AdjDate: Forms.formatDate(AdjDate),
		RsnData: RsnData?.split("\n") || [],
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "lvId,lvName,lvBank");
};

const transformAsQueryParams = (data) => {
	const { cust, custName, adjDate, q, ...rest } = data;
	return {
		...(q && {
			q,
		}),
		...(cust?.CustID && {
			csti: cust?.CustID,
		}),
		...(custName && {
			cstn: custName,
		}),
		...(adjDate && {
			adate: Forms.formatDate(adjDate),
		}),
		...rest,
	};
};

const paramsToJsonData = (params, operator) => {
	const where = [];

	return {
		StdWhere: where,
		...(operator?.GroupKey && {
			CondData: {
				GROUP: operator.GroupKey.substring(0, 1),
			},
		}),
	};
};

const G08 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default G08;
