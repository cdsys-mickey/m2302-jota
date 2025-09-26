import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";
import P41FilterModes from "./P41FilterModePicker/P41FilterModes";

/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (payload, aliasOptions) => {
	const {
		OrdDate,
		TrxDate,
		ArrDate,
		ArrHM,
		CFlag,
		CityID,
		CityData_N,
		CtAreaID_N,
		CtAreaData_N,
		GrpType,
		CustTID,
		CustTData_N,
		CarID,
		CarData_N,
		TrvID,
		TrvData_N,
		EmplID,
		EmplData_N,
		CndID,
		CndName,
		...rest
	} = payload;
	return {
		OrdDate: Forms.parseDate(OrdDate),
		TrxDate: Forms.parseDate(TrxDate),
		ArrDate: Forms.parseDate(ArrDate),
		ArrHM: Forms.parseTime(ArrHM),
		CFlag: CFlag === "Y",
		city: CityID
			? {
					CodeID: CityID,
					CodeData: CityData_N,
			  }
			: null,
		CityData_N,
		area: CtAreaID_N
			? {
					CodeID: CtAreaID_N,
					CodeData: CtAreaData_N,
			  }
			: null,
		GrpType: CmsGroupTypes.getOptionById(GrpType, aliasOptions),
		custType: CustTID
			? {
					CodeID: CustTID,
					CodeData: CustTData_N,
			  }
			: null,
		busComp: CarID
			? {
					CarID,
					CarData: CarData_N,
			  }
			: null,
		CarData_N,
		tourGroup: TrvID
			? {
					TrvID,
					TrvData: TrvData_N,
			  }
			: null,
		TrvData_N,
		tourGuide: CndID
			? {
					CndID,
					CndData: CndName,
			  }
			: null,
		CndName,
		employee: EmplID
			? {
					CodeID: EmplID,
					CodeData: EmplData_N,
			  }
			: null,
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const {
		OrdDate,
		ArrDate,
		TrxDate,
		ArrHM,
		CFlag,
		city,
		area,
		GrpType,
		custType,
		busComp,
		tourGroup,
		tourGuide,
		employee,
		// CloseLog,
		...rest
	} = payload;
	return {
		OrdDate: Forms.formatDate(OrdDate),
		ArrDate: Forms.formatDate(ArrDate),
		TrxDate: Forms.formatDate(TrxDate),
		ArrHM: Forms.formatTime(ArrHM) ?? "",
		CFlag: CFlag ? "Y" : "",
		CityID: city?.CodeID ?? "",
		CtAreaID: area?.CodeID ?? "",
		GrpType: GrpType?.id ?? "",
		CustTID: custType?.CodeID ?? "",
		CarID: busComp?.CarID ?? "",
		TrvID: tourGroup?.TrvID ?? "",
		CndID: tourGuide?.CndID ?? "",
		EmplID: employee?.CodeID ?? "",
		// CloseLog: CloseLog ?? "",
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "lvId,lvName,lvBank");
};

const transformAsQueryParams = (data) => {
	const { lvArrDate, lvOrdDate, lvFilterMode, qs, ...rest } = data;
	return {
		...(qs && {
			qs,
		}),
		...(lvArrDate && {
			ard: Forms.formatDate(lvArrDate),
		}),
		...(lvOrdDate && {
			ord: Forms.formatDate(lvOrdDate),
		}),
		...(lvFilterMode && {
			c: lvFilterMode?.id,
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

const getDefaultValues = () => {
	return {
		lvArrDate: new Date(),
		lvFilterMode: P41FilterModes.getDefaultOption(),
	};
};

const P41 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
	getDefaultValues,
};

export default P41;
