/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects.mjs";

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, ...rest }) => {
			return {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				...rest,
			};
		}) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.prod?.ProdID)
		.map(({ Pkey, prod, SQty, ...rest }, index) => ({
			Pkey: Pkey?.length < 36 ? "" : Pkey,
			SProdID: prod?.ProdID,
			ProdData_N: prod?.ProdData,
			SQty: SQty?.toString() || "",
			Seq: index + 1,
			...rest,
		}));
};

const transformForReading = (payload) => {
	const { EmplID, EmplData_N, BomCal_S, ...rest } = payload;

	return {
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		prods: transformGridForReading(BomCal_S),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { employee, ...rest } = payload;
	return {
		EmplID: employee?.CodeID || "",
		...rest,
		...(gridData && {
			BomCal_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
	};
};

const getTotal = (gridData) => {
	if (!gridData) {
		return 0;
	}
	let result = 0;
	for (const rowData of gridData) {
		const { SAmt } = rowData;
		result += SAmt ? Number(SAmt) : 0;
	}
	return result;
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "employee");
};

const findProdIndex = ({ newValue, rowData, rowIndex }) => {
	if (!rowData?.prod?.ProdID) {
		return -1;
	}

	const targetProdID = rowData.prod.ProdID;

	for (let i = 0; i < newValue.length; i++) {
		if (i !== rowIndex && newValue[i]?.prod?.ProdID === targetProdID) {
			return i;
		}
	}

	return -1;
};

const D07 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	findProdIndex,
};

export default D07;
