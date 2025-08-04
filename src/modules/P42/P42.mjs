import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";
import CmsCalcTypes from "@/components/CmsCalcTypePicker/CmsCalTypes.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */
const transformRangeGridForReading = (gridData) => {
	return (
		gridData
			?.filter((x) => x.SCustID)
			.map(({ Seq, SCustID, ECustID }, rowIndex) => ({
				// Seq: rowIndex + 1,
				Seq,
				SCustID,
				ECustID,
			})) ?? []
	);
};
const transformCmsGridForReading = (gridData) => {
	return (
		gridData
			?.filter((x) => x.SCmsID)
			.map(
				(
					{
						CmsData_N,
						SCmsID,
						SCndCms,
						SDrvCms,
						SPCAmt,
						SSalAmt,
						STrvCms,
						Seq,
					},
					rowIndex
				) => ({
					// Seq: rowIndex + 1,
					Seq,
					cmsType: {
						CodeID: SCmsID,
						CodeData: CmsData_N,
					},
					SCndCms,
					SDrvCms,
					SPCAmt,
					SSalAmt,
					STrvCms,
				})
			) ?? []
	);
};

const transformForReading = (payload) => {
	const {
		SalDate,
		OrdID,
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
		CndID,
		CndName,
		EmplID,
		EmplData_N,
		AcctID,
		AcctData_N,
		ComFile_CustIDs,
		ComFile_S,
		HotelPay,
		TrvPay,
		CndPay,
		CarPay,
		DrvPay,
		CalcType,
		HotelID,
		HotelData_N,
		...rest
	} = payload;
	return {
		SalDate: Forms.parseDate(SalDate),
		bookingOrder: OrdID
			? {
					OrdID,
			  }
			: null,
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
		cashier: AcctID
			? {
					CodeID: AcctID,
					CodeData: AcctData_N,
			  }
			: null,
		hotel: HotelID
			? {
					CodeID: HotelID,
					CodeData: HotelData_N,
			  }
			: null,
		ranges: transformRangeGridForReading(ComFile_CustIDs),
		commissions: transformCmsGridForReading(ComFile_S),
		HotelPay: HotelPay ? HotelPay === "Y" : null,
		TrvPay: TrvPay ? TrvPay === "Y" : null,
		CndPay: CndPay ? CndPay === "Y" : null,
		CarPay: CarPay ? CarPay === "Y" : null,
		DrvPay: DrvPay ? DrvPay === "Y" : null,
		CalcType: CmsCalcTypes.getOptionById(CalcType) ?? null,
		...rest,
	};
};

const transformForImport = (payload) => {
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

const transformRangeGridForSubmitting = (gridData) => {
	return (
		gridData
			?.filter((v) => v.SCustID)
			.map(({ SCustID, ECustID, ...rest }, index) => ({
				Seq: index + 1,
				SCustID: SCustID?.toUpperCase() ?? "",
				ECustID: ECustID?.toUpperCase() ?? "",
				...rest,
			})) ?? []
	);
};

const transformCmsGridForSubmitting = (gridData) => {
	return (
		gridData
			?.filter((v) => v.cmsType)
			.map(
				(
					{
						cmsType,
						CmsData_N,
						SSalAmt,
						STrvCms,
						SCndCms,
						SCarCms,
						...rest
					},
					index
				) => ({
					Seq: index + 1,
					SCmsID: cmsType?.CodeID ?? "",
					CmsData_N,
					SSalAmt: SSalAmt?.toString(),
					STrvCms: STrvCms?.toString(),
					SCndCms: SCndCms?.toString(),
					SCarCms: SCarCms?.toString(),
					...rest,
				})
			) ?? []
	);
};

const transformForEditorSubmit = (payload, rangeGridData, cmsGridData) => {
	const {
		SalDate,
		bookingOrder,
		city,
		area,
		GrpType,
		custType,
		busComp,
		tourGroup,
		tourGuide,
		employee,
		cashier,
		hotel,
		HotelPay,
		TrvPay,
		CndPay,
		DrvPay,
		// 忽略 props
		cmsType,
		ranges,
		commissions,
		CalcType,
		CarQty,
		...rest
	} = payload;

	console.log("ignore props", cmsType, commissions, ranges);

	return {
		SalDate: Forms.formatDate(SalDate),
		OrdID: bookingOrder?.OrdID || "",
		CityID: city?.CodeID ?? "",
		CtAreaID: area?.CodeID ?? "",
		GrpType: GrpType?.id ?? "",
		CustTID: custType?.CodeID ?? "",
		CarID: busComp?.CarID ?? "",
		TrvID: tourGroup?.TrvID ?? "",
		CndID: tourGuide?.CndID ?? "",
		EmplID: employee?.CodeID ?? "",
		AcctID: cashier?.CodeID ?? "",
		HotelID: hotel?.CodeID ?? "",
		HotelPay: HotelPay ? "Y" : "N",
		TrvPay: TrvPay ? "Y" : "N",
		CndPay: CndPay ? "Y" : "N",
		DrvPay: DrvPay ? "Y" : "N",
		ComFile_CustIDs: transformRangeGridForSubmitting(rangeGridData),
		ComFile_S: transformCmsGridForSubmitting(cmsGridData),
		CalcType: CalcType?.id || "",
		CarQty: CarQty || "1",
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

const P42 = {
	transformForReading,
	transformForImport,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P42;
