import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */

const transformCashGridForReading = (data) => {
	return data.map(({ RcvDate, ...rest }) => {
		return {
			// RcvDate: Forms.parseDate(RcvDate),

			RcvDate: RcvDate,
			...rest,
		};
	});
};

const transformChkGridForReading = (data) => {
	return data.map(({ BankID, BankData_N, DueDate, ...rest }) => {
		return {
			BankID: {
				CodeID: BankID,
				CodeData: BankData_N,
			},
			// DueDate: Forms.parseDate(DueDate),
			DueDate: DueDate,
			...rest,
		};
	});
};

const transformDocGridForReading = (data) => {
	return data.map(({ DocID, DocType, DocDate, WoNotes, ...rest }) => {
		return {
			// DocDate: Forms.parseDate(DocDate),
			DocID: {
				DocID,
				DocType,
			},
			DocDate: DocDate,
			WoNotes: WoNotes === "Y",
			...rest,
		};
	});
};

const transformForReading = (payload) => {
	const {
		CustID,
		PreAmt,
		RcvAmt,
		CollAmt,
		RemAmt,
		CashAmt,
		DnsAmt,
		ChkAmt,
		CutAmt,
		CustData_N,
		RcvCash_S,
		RcvChk_S,
		RcvDoc_S,
		...rest
	} = payload;
	return {
		CustID: {
			CustID,
			CustData: CustData_N,
		},
		PreAmt: Forms.parseNumber(PreAmt),
		RcvAmt: Forms.parseNumber(RcvAmt),
		CollAmt: Forms.parseNumber(CollAmt),
		RemAmt: Forms.parseNumber(RemAmt),
		CashAmt: Forms.parseNumber(CashAmt),
		DnsAmt: Forms.parseNumber(DnsAmt),
		ChkAmt: Forms.parseNumber(ChkAmt),
		CutAmt: Forms.parseNumber(CutAmt),
		// 增加收沖差額
		DiffAmt: Forms.parseNumber(CollAmt) - Forms.parseNumber(CutAmt),
		cashGridData: transformCashGridForReading(RcvCash_S),
		chkGridData: transformChkGridForReading(RcvChk_S),
		docGridData: transformDocGridForReading(RcvDoc_S),
		...rest,
	};
};

const transformCashGridForSubmit = (data) => {
	return data
		.filter((x) => x.RcvDate)
		.map(({ RcvDate, CashAmt, DnsAmt, ...rest }) => ({
			RcvDate: RcvDate || "",
			CashAmt: CashAmt?.toString() || "",
			DnsAmt: DnsAmt?.toString() || "",
			...rest,
		}));
};

const transformChkGridForSubmit = (data) => {
	return data
		.filter((x) => x.ChkAmt)
		.map(({ ChkAmt, BankID, ...rest }) => ({
			ChkAmt: ChkAmt?.toString() || "",
			BankID: BankID?.CodeID || "",
			...rest,
		}));
};

const transformDocGridForSubmit = (data) => {
	return data
		.filter((x) => x.DocID)
		.map(({ DocID, SalAmt, RetAmt, AdjAmt, WoNotes, ...rest }) => ({
			DocID: DocID?.DocID || "",
			DocType: DocID?.DocType || "",
			SalAmt: SalAmt?.toString() || "",
			RetAmt: RetAmt?.toString() || "",
			AdjAmt: AdjAmt?.toString() || "",
			WoNotes: WoNotes ? "Y" : "",
			...rest,
		}));
};

const transformForEditorSubmit = (
	payload,
	cashGridData,
	chkGridData,
	docGridData
) => {
	const {
		BankID,
		CustID,
		cashGridData: _cashGridData,
		chkGridData: _chkGridData,
		docGridData: _docGridData,
		...rest
	} = payload;
	console.log("ignore props", _cashGridData, _chkGridData, _docGridData);

	return {
		BankID: BankID?.CodeID || "",
		CustID: CustID?.CustID || "",
		CustData_N: CustID?.CustData || "",
		...rest,
		RcvCash_S: transformCashGridForSubmit(cashGridData),
		RcvChk_S: transformChkGridForSubmit(chkGridData),
		RcvDoc_S: transformDocGridForSubmit(docGridData),
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

const buildId = ({ AccYM, Stage, CustID }) => {
	return `${AccYM}#${Stage}#${CustID}`;
};

const buildName = (data) => {
	return `${data?.AccYM}第${data?.Stage}期-${
		data.CustID?.CustData || data.CustData_N
	}`;
};

const G06 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
	buildId,
	buildName,
};

export default G06;
