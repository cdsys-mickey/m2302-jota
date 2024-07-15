/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, ...rest }) => {
			return {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
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
	const {
		RemDate,
		InitDate,
		PDlineID,
		PDlineData_N,
		EmplID,
		EmplData_N,
		MatRem_S,
		Remark,
		...rest
	} = payload;

	return {
		RemDate: Forms.parseDate(RemDate),
		InitDate: Forms.parseDate(InitDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		pdline: PDlineID
			? {
					CodeID: PDlineID,
					CodeData: PDlineData_N,
			  }
			: null,
		prods: transformGridForReading(MatRem_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { RemDate, InitDate, employee, pdline, remark, ...rest } = payload;
	return {
		RemDate: RemDate ? Forms.formatDate(RemDate) : "",
		InitDate: InitDate ? Forms.formatDate(InitDate) : "",
		EmplID: employee?.CodeID || "",
		PDlineID: pdline?.CodeID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			MatRem_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee, bdate } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
		...(bdate && {
			bdate: Forms.formatDate(bdate),
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
	return Objects.isAnyPropNotEmpty(criteria, "employee,bdate");
};

const isProdExists = ({ newValue, rowData, rowIndex }) => {
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

const D06 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	isProdExists,
};

export default D06;
