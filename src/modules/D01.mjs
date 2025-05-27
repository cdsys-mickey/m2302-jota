/* eslint-disable no-mixed-spaces-and-tabs */
import Strings from "@/shared-modules/sd-strings";
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects.mjs";

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const { SProdID, ProdData_N, SExpDate, ...rest } = rowData;
			let processedRowData = {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				// SExpDate: Forms.reformatDateAsDash(SExpDate),
				SExpDate: SExpDate,
				// overrideSQty: SQtyNote === "*",
				...rest,
			};
			processedRowData.tooltip = getTooltips({
				rowData: processedRowData,
				rowIndex,
			});

			return processedRowData;
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
		...(gridData && {
			MatOut_S: transformGridForSubmitting(gridData),
		}),
		...rest,
	};
};

const transformAsQueryParams = (data) => {
	const { employee, pdate, pdline } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
		...(pdate && {
			pdate: Forms.formatDate(pdate),
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

const getTooltip = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push(`庫存量(${stockQty || 0})`);
		}
	}
	const result = results.join(", ");
	console.log(`${getTooltip.name}`, result);
	return result;
};

const getTooltips = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push({
				label: `庫存量`,
				value: stockQty ?? 0,
			});
			if (rowData?.SafeQty_N) {
				const safety = Number(rowData?.SafeQty_N) || 0;

				const value = safety > 0 ? stockQty - safety : stockQty;
				if (stockQty < (safety > 0 ? safety : 0)) {
					results.push({
						label: `低於安存量`,
						value: value,
					});
				}
			}
		}
	}
	// const result = results.join(", ");
	console.log(`${getTooltips.name}`, results);
	return results;
};

const D01 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	findProdIndex,
	getTooltip,
	getTooltips,
};

export default D01;
