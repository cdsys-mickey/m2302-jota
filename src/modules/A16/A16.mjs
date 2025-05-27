import Objects from "@/shared-modules/Objects.mjs";

/* eslint-disable no-mixed-spaces-and-tabs */
const transformForReading = (payload) => {
	const { FlagShip, HeadOffice, ...rest } = payload;
	return {
		flagship: FlagShip == 1,
		headOffice: HeadOffice == 1,
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { flagship, headOffice, ...rest } = payload;
	return {
		FlagShip: flagship ? "1" : "",
		HeadOffice: headOffice ? "1" : "",
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

const paramsToJsonData = (params, operator) => {
	const where = [];

	return {
		StdWhere: where,
		...(operator?.GroupKey && {
			CondData: {
				GROUP: operator.GroupKey.substring(0, 1),
			},
		}),
	};
};

const A16 = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	isFiltered,
	transformAsQueryParams,
};

export default A16;
