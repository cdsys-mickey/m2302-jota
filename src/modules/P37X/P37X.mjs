import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */

const transformGridForReading = (data) => {
	return (
		data?.map((rowData) => {
			const { SDnCp, SUpCp, STrvCms, SCndCms, ...rest } = rowData;
			let processedRowData = {
				SDnCp: SDnCp?.toString() ?? "",
				SUpCp: SUpCp?.toString() ?? "",
				STrvCms: STrvCms?.toString() ?? "",
				SCndCms: SCndCms?.toString() ?? "",
				...rest,
			};
			return processedRowData;
		}) || []
	);
};

const transformForReading = (payload) => {
	const { ComNCont_S, ...rest } = payload || {};

	return {
		commissions: ComNCont_S ? transformGridForReading(ComNCont_S) : [],
		// ...(ComNCont_S && {
		// 	commissions: transformGridForReading(ComNCont_S),
		// }),
		...rest,
	};
};

const transformGridForSubmit = (data) => {
	return data
		.filter((x) => x.SDnCp || x.SUpCp || x.SDrvCms || x.STrvCms)
		.map(({ SDnCp, SUpCp, STrvCms, SDrvCms, ...rest }) => ({
			SDnCp: SDnCp?.toString() ?? "",
			SUpCp: SUpCp?.toString() ?? "",
			SDrvCms: SDrvCms?.toString() ?? "",
			STrvCms: STrvCms?.toString() ?? "",
			...rest,
		}));
};

const transformForEditorSubmit = (payload, gridData) => {
	const { GrpType, commissions, ...rest } = payload;

	console.log("ignore props", commissions);

	return {
		GrpType,
		ComNCont_S: transformGridForSubmit(gridData),
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

const P37X = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default P37X;
