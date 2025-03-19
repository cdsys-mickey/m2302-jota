/* eslint-disable no-mixed-spaces-and-tabs */
import Strings from "@/shared-modules/sd-strings";
import Forms from "../shared-modules/Forms.mjs";

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
		}
	}
	console.log(`${getTooltips.name}`, results);
	return results;
};

const ListModes = Object.freeze({
	NOT_REVIEWED: 1,
	REVIEWED: 2,
	// ALL: 3,
});

const options = [
	{ id: ListModes.NOT_REVIEWED, label: "待覆核" },
	{ id: ListModes.REVIEWED, label: "已覆核" },
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
			const { SProdID, ProdData_N, ...rest } = rowData;

			let processedRowData = {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
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
		RqtDate: Forms.formatDate(RqtDate),
		EmplID: employee?.CodeID || "",
		PDlineID: pdline?.CodeID || "",
		Remark: remark?.split("\n") || [],
		...(gridData && {
			GdsRqt_S: gridData
				.filter((v) => v.prod?.ProdID)
				.map(
					(
						{
							Pkey,
							prod,
							SRqtQty,
							SOrdQty,
							SFactID,
							SFactNa,
							SOrdID,
						},
						index
					) => ({
						Pkey: Pkey?.length < 36 ? "" : Pkey,
						SProdID: prod?.ProdID,
						SRqtQty,
						SOrdQty,
						SFactID,
						SFactNa,
						SOrdID,
						Seq: index + 1,
					})
				),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { order, employee, date, pdline } = data;
	return {
		...(order && {
			q: order?.["請購單號"],
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
	};
};

const C02 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGrid: transformGridForReading,
	// 列表模式
	ListModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	getTooltip,
	getTooltips,
};

export default C02;
