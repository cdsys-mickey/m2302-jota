/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, SExpDate, ...rest }) => {
			return {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				SExpDate: Forms.reformatDate(SExpDate),
				// overrideSQty: SQtyNote === "*",
				...rest,
			};
		}) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.prod?.ProdID)
		.map(({ Pkey, prod, SExpDate, SQty, StockQty_N, ...rest }, index) => ({
			Pkey: Pkey?.length < 36 ? "" : Pkey,
			SProdID: prod?.ProdID,
			ProdData_N: prod?.ProdData,
			SExpDate: Forms.formatDate(SExpDate),
			SQty: SQty?.toString() || "",
			StockQty_N: StockQty_N?.toString() || "",
			// SQtyNote: overrideSQty ? "*" : "",
			Seq: index + 1,
			...rest,
		}));
};

const transformForReading = (payload) => {
	const {
		OutDate,
		PDlineID,
		PDlineData_N,
		EmplID,
		EmplData_N,
		MatOut_S,
		Remark,
		...rest
	} = payload;

	return {
		OutDate: Forms.parseDate(OutDate),
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
		prods: transformGridForReading(MatOut_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { OutDate, employee, pdline, remark, ...rest } = payload;
	return {
		OutDate: OutDate ? Forms.formatDate(OutDate) : "",
		EmplID: employee?.CodeID || "",
		PDlineID: pdline?.CodeID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			MatOut_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee, rdate, pdline } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
		...(rdate && {
			rdate: Forms.formatDate(rdate),
		}),
		...(pdline && {
			pdline: pdline.CodeID,
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
	return Objects.isAnyPropNotEmpty(criteria, "employee,pdate,pdline");
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

const D01 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	findProdIndex,
};

export default D01;
