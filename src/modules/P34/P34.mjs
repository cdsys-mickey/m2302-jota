import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const { MBonus, MDnCP, MFixP, MUpCP, ...rest } = rowData;
			let processedRowData = {
				MBonus,
				MDnCP,
				MFixP: MFixP === "Y",
				MUpCP,
				...rest,
			};
			return processedRowData;
		}) || []
	);
};

const transformForReading = (payload) => {
	const {
		CityID,
		CityData_N,
		CtAreaID,
		CtAreaData_N,
		BankID,
		BankData_N,
		BonusTB,
		Assign,
		...rest
	} = payload;
	return {
		Assign: Assign === "Y",
		city: CityID
			? {
					CodeID: CityID,
					CodeData: CityData_N,
			  }
			: null,
		area: CtAreaID
			? {
					CodeID: CtAreaID,
					CodeData: CtAreaData_N,
			  }
			: null,
		bank: BankID
			? {
					CodeID: BankID,
					CodeData: BankData_N,
			  }
			: null,
		...rest,
		...(BonusTB && {
			ranges: transformGridForReading(BonusTB),
		}),
	};
};

const transformGridForSubmit = (data) => {
	return (
		data
			// .filter((x) => x.ChkAmt)
			.map(({ MDnCp, MUpCP, MBonus, MFixP, ...rest }) => ({
				MDnCp: MDnCp?.toString() ?? "",
				MUpCP: MUpCP?.toString() ?? "",
				MBonus: MBonus?.toString() ?? "",
				MFixP: MFixP ? "Y" : "N",
				...rest,
			}))
	);
};

const transformForEditorSubmit = (payload, gridData) => {
	const { Assign, city, bank, area, ranges, ...rest } = payload;

	console.log("ignore props", ranges);

	return {
		CityID: city?.CodeID ?? "",
		CtAreaID: area?.CodeID ?? "",
		BankID: bank?.CodeID ?? "",
		BonusTB: transformGridForSubmit(gridData),
		Assign: Assign ? "Y" : "N",
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

const P34 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P34;
