import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */
const Mode = Object.freeze({
	CUSTOMER: Symbol("CUSTOMER"),
	NEW_CUSTOMER: Symbol("NEW_CUSTOMER"),
});

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		BankID,
		BankData_N,
		RecvID,
		RecvData_N,
		LineID,
		LineData_N,
		TrafID,
		TrafData_N,
		AreaID,
		AreaData_N,
		Class,
		MainProd = [],
		Remark = [],
		...rest
	} = payload;
	return {
		...rest,
		level: Class
			? {
					CodeID: Class,
					CodeData: Class,
			  }
			: null,
		employee: EmplID
			? {
					CodeID: EmplID,
					CodeData: EmplData_N,
			  }
			: null,
		bank: BankID
			? {
					CodeID: BankID,
					CodeData: BankData_N,
			  }
			: null,
		area: AreaID
			? {
					CodeID: AreaID,
					CodeData: AreaData_N,
			  }
			: null,
		channel: LineID
			? {
					CodeID: LineID,
					CodeData: LineData_N,
			  }
			: null,
		payment: RecvID
			? {
					CodeID: RecvID,
					CodeData: RecvData_N,
			  }
			: null,
		transport: TrafID
			? {
					CodeID: TrafID,
					CodeData: TrafData_N,
			  }
			: null,
		mainProd: MainProd.join("\n"),
		remark: Remark.join("\n"),
	};
};

const transformForEditorSubmit = (payload) => {
	const {
		employee,
		bank,
		area,
		channel,
		payment,
		transport,
		level,
		mainProd,
		remark,
		...rest
	} = payload;
	return {
		EmplID: employee?.CodeID || "",
		BankID: bank?.CodeID || "",
		AreaID: area?.CodeID || "",
		LineID: channel?.CodeID || "",
		RecvID: payment?.CodeID || "",
		TrafID: transport?.CodeID || "",
		MainProd: mainProd?.split("\n") || [],
		Remark: remark?.split("\n") || [],
		Class: level?.CodeID || "",
		...rest,
	};
};

const paramsToJsonData = (params) => {
	const where = [];
	if (params?.ci) {
		where.push({
			ShowName: "客戶代號",
			OpCode: "LIKE",
			CondData: "%" + params.ci + "%",
		});
	}
	if (params?.cn) {
		where.push({
			ShowName: "客戶名稱",
			OpCode: "LIKE",
			CondData: "%" + params.cn + "%",
		});
	}
	if (params?.bank) {
		where.push({
			ShowName: "往來銀行",
			OpCode: "=",
			CondData: params.bank,
		});
	}
	if (params?.area) {
		where.push({
			ShowName: "區域",
			OpCode: "=",
			CondData: params.area,
		});
	}
	if (params?.emp) {
		where.push({
			ShowName: "業務員",
			OpCode: "=",
			CondData: params.emp,
		});
	}
	if (params?.paym) {
		where.push({
			ShowName: "收款方式",
			OpCode: "=",
			CondData: params.paym,
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

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"lvId,lvName,lvEmployee,lvArea,lvPaymentType,lvBank"
	);
};

const transformAsQueryParams = (data) => {
	const { lvId, lvName, lvEmployee, lvBank, lvArea, lvPaymentType, ...rest } =
		data;
	return {
		ci: lvId,
		cn: lvName,
		...(lvEmployee && {
			emp: lvEmployee?.CodeID,
		}),
		...(lvBank && {
			bank: lvBank?.CodeID,
		}),
		...(lvArea && {
			area: lvArea.CodeID,
		}),
		...(lvPaymentType && {
			paym: lvPaymentType.CodeID,
		}),
		...rest,
	};
};

const A06 = {
	Mode,
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default A06;
