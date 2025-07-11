import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (payload) => {
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
		GrpType: CmsGroupTypes.getOptionById(GrpType),
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

const P41 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P41;
