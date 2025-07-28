import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import Objects from "@/shared-modules/Objects.mjs";

const BusCmsTypes = Object.freeze({
	AMOUNT: 0,
	PERCENT: 1,
});

/* eslint-disable no-mixed-spaces-and-tabs */

// const transformGridForReading = (data) => {
// 	return (
// 		data?.map((rowData) => {
// 			const { SDnCp, SUpCp, STrvCms, SCndCms, ...rest } = rowData;
// 			let processedRowData = {
// 				SDnCp: SDnCp?.toString() ?? "",
// 				SUpCp: SUpCp?.toString() ?? "",
// 				STrvCms: STrvCms?.toString() ?? "",
// 				SCndCms: SCndCms?.toString() ?? "",
// 				...rest,
// 			};
// 			return processedRowData;
// 		}) || []
// 	);
// };

const transformForReading = (payload, selectedTab) => {
	const result = {
		GrpType: payload.GrpType,
		SUpCP: [],
		SDrvCms: [],
		STrvCms: [],
		SDnCp: [],
	};

	payload.ComNCont_S.forEach((item) => {
		// 處理 SUpCp
		result.SUpCP.push(item.SUpCp || null);

		// 處理 SDrvCms，移除百分比符號
		result.SDrvCms.push(
			item.SDrvCms ? item.SDrvCms.replace("%", "") : null
		);
		result.STrvCms.push(
			item.STrvCms ? item.STrvCms.replace("%", "") : null
		);

		// 處理 SDnCp
		result.SDnCp.push(item.SDnCp || null);
	});

	if (selectedTab !== CmsGroupTypes.Types.CHINA) {
		return result;
	}

	const rowData = payload.ComNCont_S?.[0];
	const { SDrvCms } = rowData;
	let valueA = "";
	let valueB = "";
	let busCmsType = null;
	if (SDrvCms.includes("%")) {
		valueB = SDrvCms.replace("%", "");
		busCmsType = 1;
	} else {
		valueA = SDrvCms;
		busCmsType = 0;
	}

	return {
		...result,
		ADrvCms: valueA,
		BDrvCms: valueB,
		busCmsType,
	};
};

const transformForChinaReading = (payload) => {
	const rowData = payload.ComNCont_S?.[0];
	const { SDrvCms, STrvCms } = rowData;
	let valueA = "";
	let valueB = "";
	let busCmsType = null;
	if (SDrvCms.includes("%")) {
		valueB = SDrvCms.replace("%", "");
		busCmsType = 1;
	} else {
		valueA = SDrvCms;
		busCmsType = 0;
	}
	return {
		ADrvCms: valueA,
		BDrvCms: valueB,
		ATrvCms: STrvCms,
		busCmsType,
	};
};

const transformForEditorSubmit = (payload, selecedtTab) => {
	const output = {
		GrpType: selecedtTab,
		ComNCont_S: [],
	};

	if (selecedtTab == CmsGroupTypes.Types.CHINA) {
		const { busCmsType, ADrvCms, BDrvCms, ATrvCms, ...rest } = payload;
		output.ComNCont_S.push({
			Seq: 1,
			SDrvCms:
				busCmsType == BusCmsTypes.AMOUNT
					? ADrvCms
					: `${BDrvCms ?? "0"}%`,
			STrvCms: ATrvCms,
			...rest,
		});
	} else {
		const maxLength = Math.max(
			payload.SUpCP.length,
			payload.SDrvCms.length,
			payload.STrvCms.length,
			payload.SDnCp.length
		);

		for (let i = 0; i < maxLength; i++) {
			const item = {
				Seq: i + 1,
				SDnCp: payload.SDnCp[i]
					? Number(payload.SDnCp[i]).toFixed(2)
					: "",
				SUpCp: payload.SUpCP[i] || "",
				SDrvCms:
					i === 0 || i === 2
						? `${payload.SDrvCms[i]}%`
						: payload.SDrvCms[i] || "",
				STrvCms:
					i === 0 || i === 2
						? `${payload.STrvCms[i]}%`
						: payload.STrvCms[i] || "",
			};
			output.ComNCont_S.push(item);
		}
	}

	return output;
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

const P37 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
	transformForChinaReading,
	BusCmsTypes,
};

export default P37;
