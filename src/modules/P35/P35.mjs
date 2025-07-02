import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */

const transformGridForReading = (data) => {
	return (
		data?.map((rowData) => {
			const { SCmsID, SCmsData_N, STrvCms, SCndCms, SDrvCms, ...rest } =
				rowData;
			let processedRowData = {
				cmsType: {
					CodeID: SCmsID,
					CodeData: SCmsData_N,
				},
				STrvCms,
				SCndCms,
				SDrvCms,
				...rest,
			};
			return processedRowData;
		}) || []
	);
};

const transformForReading = (payload) => {
	const {
		BankID,
		BankData_N,
		CityID,
		CityData_N,
		CtAreaID,
		CtAreaData_N,
		TrvFile_S,
		Remark,
		Assign,
		AsRemark,
		PayNowTB,
		CarNoTB,
		FixCmsTB,

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
		Remark: Remark.join("\n"),
		AsRemark: AsRemark.join("\n"),
		clearOnSite1: PayNowTB?.[0]?.STrvPnow === "Y",
		clearOnSite2: PayNowTB?.[0]?.SCndPnow === "Y",
		clearOnSite3: PayNowTB?.[0]?.SDrvPnow === "Y",
		guideAmt: FixCmsTB?.[0]?.SCndFCms,
		driverAmt: FixCmsTB?.[0]?.SDrvFCms,
		guideAmtMultipliedByBus: CarNoTB?.[0]?.SCndCar === "Y",
		driverAmtMultipliedByBus: CarNoTB?.[0]?.SDrvCar === "Y",
		...(TrvFile_S && {
			commissions: transformGridForReading(TrvFile_S),
		}),
		...rest,
	};
};

const transformGridForSubmit = (data) => {
	return data
		.filter((x) => x.cmsType?.CodeID)
		.map(({ cmsType, STrvCms, SCndCms, SDrvCms, ...rest }) => ({
			SCmsID: cmsType?.CodeID ?? "",
			STrvCms: STrvCms?.toString() ?? "",
			SCndCms: SCndCms?.toString() ?? "",
			SDrvCms: SDrvCms?.toString() ?? "",
			...rest,
		}));
};

const transformForEditorSubmit = (payload, gridData) => {
	const {
		Assign,
		city,
		bank,
		area,
		commissions,
		// PayNowTB
		clearOnSite1,
		clearOnSite2,
		clearOnSite3,
		// FixCmsTB
		guideAmt,
		driverAmt,
		// CarNoTB
		guideAmtMultipliedByBus,
		driverAmtMultipliedByBus,
		cmsType,
		Remark,
		AsRemark,
		...rest
	} = payload;

	console.log("ignore props", commissions, cmsType);

	return {
		CityID: city?.CodeID ?? "",
		CtAreaID: area?.CodeID ?? "",
		BankID: bank?.CodeID ?? "",
		Remark: Remark?.split("\n") || [],
		Assign: Assign ? "Y" : "N",
		AsRemark: AsRemark?.split("\n") || [],
		PayNowTB: [
			{
				STrvPnow: clearOnSite1 ? "Y" : "N",
				SCndPnow: clearOnSite2 ? "Y" : "N",
				SDrvPnow: clearOnSite3 ? "Y" : "N",
			},
		],
		// FixCmsTB:
		// 	guideAmt || driverAmt
		// 		? [
		// 				{
		// 					SCndFCms: guideAmt?.toString() ?? "",
		// 					SDrvFCms: driverAmt?.toString() ?? "",
		// 				},
		// 		  ]
		// 		: [],
		FixCmsTB: [
			{
				SCndFCms: guideAmt?.toString() ?? "",
				SDrvFCms: driverAmt?.toString() ?? "",
			},
		],
		// CarNoTB:
		// 	guideAmtMultipliedByBus || driverAmtMultipliedByBus
		// 		? [
		// 				{
		// 					SCndCar: guideAmtMultipliedByBus ? "Y" : "N",
		// 					SDrvCar: driverAmtMultipliedByBus ? "Y" : "N",
		// 				},
		// 		  ]
		// 		: [],
		CarNoTB: [
			{
				SCndCar: guideAmtMultipliedByBus ? "Y" : "N",
				SDrvCar: driverAmtMultipliedByBus ? "Y" : "N",
			},
		],
		TrvFile_S: transformGridForSubmit(gridData),
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

const P35 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P35;
