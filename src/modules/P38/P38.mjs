import Objects from "@/shared-modules/Objects.mjs";
import P38CalType from "./form/pickers/P38CalType.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */

const transformForReading = (payload) => {
	const { Head, Tail, CmsCalc, ...rest } = payload || {};

	return {
		Head: Head ?? "",
		Tail: Tail.join("\n"),
		CmsCalc: P38CalType.getOptionById(CmsCalc),
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { Head, Tail, CmsCalc, ...rest } = payload;

	// console.log("ignore props", commissions);

	return {
		Head: Head ?? "",
		Tail: Tail.split("\n"),
		CmsCalc: CmsCalc?.id ?? "",
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "lvId,lvName,lvBank");
};

const transformAsQueryParams = (data) => {
	const { lvId, lvName, lvBank, ...rest } = data;
	return {
		si: lvId,
		sn: lvName,
		...(lvBank && {
			bank: lvBank?.CodeID,
		}),
		...rest,
	};
};

const paramsToJsonData = (params) => {
	const where = [];
	if (params?.si) {
		where.push({
			ShowName: "廠商代碼",
			OpCode: "LIKE",
			CondData: "%" + params.si + "%",
		});
	}
	if (params?.sn) {
		where.push({
			ShowName: "廠商名稱",
			OpCode: "LIKE",
			CondData: "%" + params.sn + "%",
		});
	}
	if (params?.bank) {
		where.push({
			ShowName: "往來銀行",
			OpCode: "=",
			CondData: params.bank,
		});
	}

	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const P38 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P38;
