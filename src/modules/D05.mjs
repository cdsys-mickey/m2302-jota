/* eslint-disable no-mixed-spaces-and-tabs */
import Strings from "@/shared-modules/sd-strings";
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects.mjs";

const transformGridForReading = (data) => {
	return (
		data?.map((rowData, rowIndex) => {
			const {
				SProdID,
				ProdData_N,
				SRsnID,
				RsnData_N,
				SCustID,
				CustData_N,
				SDeptID,
				DeptData_N,
				...rest
			} = rowData;
			let processedRowData = {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				ProdData: ProdData_N,
				dtype: SRsnID
					? {
							CodeID: SRsnID,
							CodeData: RsnData_N,
					  }
					: null,
				...rest,
				customer: {
					CustID: SCustID,
					CustData: CustData_N,
				},
				dept: {
					DeptID: SDeptID,
					DeptName: DeptData_N,
				},
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
		.map(
			(
				{
					Pkey,
					prod,
					SQty,
					SAmt,
					dept,
					dtype,
					customer,
					StockQty_N,
					...rest
				},
				index
			) => ({
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod?.ProdID,
				ProdData_N: prod?.ProdData,
				SQty: SQty?.toString() || "",
				SAmt: SAmt?.toString() || "",
				SRsnID: dtype?.CodeID || "",
				SDeptID: dept?.DeptID || "",
				SCustID: customer?.CustID || "",
				Seq: index + 1,
				StockQty_N: StockQty_N?.toString() || "",
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const { CxlDate, EmplID, EmplData_N, Cancel_S, Remark, ...rest } = payload;

	return {
		wdate: Forms.parseDate(CxlDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		prods: transformGridForReading(Cancel_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { wdate, employee, remark, ...rest } = payload;
	return {
		CxlDate: wdate ? Forms.formatDate(wdate) : "",
		EmplID: employee?.CodeID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			Cancel_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { wdate, employee, ...rest } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
		...(wdate && {
			wdate: Forms.formatDate(wdate),
		}),
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "wdate,employee");
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

const getTooltip = ({ rowData, rowIndex }) => {
	let results = [];
	if (rowData?.prod?.ProdID) {
		if (!Strings.isNullOrEmpty(rowData?.StockQty_N)) {
			const stockQty = rowData.StockQty_N;
			results.push(`庫存量（${stockQty || 0}）`);
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

const D05 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	getTooltip,
	getTooltips,
};

export default D05;
