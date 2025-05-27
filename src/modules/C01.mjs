/* eslint-disable no-mixed-spaces-and-tabs */
import Strings from "@/shared-modules/sd-strings";
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects.mjs";

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
	console.log(`${getTooltips.name}`, results);
	return results;
};

const ListModes = Object.freeze({
	NOT_ORDERED_INCLUDED: 3,
	ORDERED: 1,
	ALL_NOT_ORDERED: 2,
	// ALL: 0,
});

const options = [
	{ id: ListModes.NOT_ORDERED_INCLUDED, label: "包含未採購" },
	{ id: ListModes.ORDERED, label: "整單已採購" },
	{ id: ListModes.ALL_NOT_ORDERED, label: "整單未採購" },
	// { id: ListModes.ALL, label: "全部" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return `${label}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const {
				SProdID,
				ProdData_N,
				PackData_N,
				StockQty_N,
				SFactID,
				SFactNa,
				...rest
			} = rowData;
			let processedRowData = {
				prod: SProdID
					? {
							ProdID: SProdID,
							ProdData: ProdData_N,
							// 複製包裝單位、庫存
							PackData_N,
							StockQty: StockQty_N,
					  }
					: null,
				ProdData: ProdData_N,
				PackData_N,
				StockQty_N,
				supplier: SFactID
					? {
							FactID: SFactID,
							FactData: SFactNa,
					  }
					: null,
				SFactNa,
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
	return (
		gridData
			?.filter((v) => v.prod?.ProdID)
			.map(
				(
					{ Pkey, prod, SRqtQty, SOrdQty, supplier, SFactNa, SOrdID },
					index
				) => ({
					Pkey: Pkey?.length < 36 ? "" : Pkey,
					SProdID: prod?.ProdID,
					SRqtQty: SRqtQty?.toString() || "",
					SOrdQty: SOrdQty?.toString() || "",
					SFactID: supplier?.FactID || "",
					SFactNa: SFactNa || "",
					SOrdID: SOrdID || "",
					Seq: index + 1,
				})
			) || []
	);
};

const transformForReading = (payload) => {
	const {
		RqtDate,
		EmplID,
		EmplData_N,
		PDlineID,
		PDlineData_N,
		GdsRqt_S,
		Remark,
		...rest
	} = payload;

	return {
		RqtDate: Forms.parseDate(RqtDate),
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
		prods: transformGridForReading(GdsRqt_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { RqtID, RqtDate, employee, pdline, remark } = payload;
	return {
		RqtID,
		RqtDate,
		EmplID: employee?.CodeID || "",
		PDlineID: pdline?.CodeID || "",
		Remark: remark?.split("\n") || [],

		...(gridData && {
			GdsRqt_S: transformGridForSubmitting(gridData),
		}),
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "rqtId,reqEmployee,date,pdline");
};

const transformAsQueryParams = (data) => {
	const { employee, date, pdline, order, orderFlag, ...rest } = data;
	return {
		...(order && {
			rid: order?.["請購單號"],
		}),
		...(employee && {
			emp: employee.CodeID,
		}),
		...(date && {
			dt: Forms.formatDate(date),
		}),
		...(pdline && {
			pdline: pdline.CodeID,
		}),
		...(orderFlag && {
			of: orderFlag?.id ?? "",
		}),
		...rest,
	};
};

const C01 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	// 列表模式
	ListModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	isFiltered,
	getTooltip,
	getTooltips,
};

export default C01;
