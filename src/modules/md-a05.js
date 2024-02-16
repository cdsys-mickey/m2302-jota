/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (payload) => {
	const { BankID, BankData_N, MainProd = [], Remark = [], ...rest } = payload;
	return {
		bank: BankID
			? {
					CodeID: BankID,
					CodeData: BankData_N,
			  }
			: null,
		mainProd: MainProd.join("\n"),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { bank, mainProd, remark, ...rest } = payload;
	return {
		BankID: bank?.CodeID || "",
		MainProd: mainProd.split("\n"),
		Remark: remark.split("\n"),
		...rest,
	};
};

const paramsToJsonData = (params) => {
	const where = [];

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

const A05 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
};

export default A05;
