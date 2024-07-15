/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";
import FreeProdTypes from "./md-free-prod-types";

const transformGridForReading = (data) => {
	return (
		data?.map(
			({ SProdID, ProdData_N, SType, SRsnID, RsnData_N, ...rest }) => {
				return {
					prod: {
						ProdID: SProdID,
						ProdData: ProdData_N,
					},
					stype: FreeProdTypes.getOptionById(SType),
					dtype: SRsnID
						? {
								CodeID: SRsnID,
								CodeData: RsnData_N,
						  }
						: null,
					...rest,
				};
			}
		) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.prod?.ProdID)
		.map(
			(
				{ Pkey, prod, SQty, SPrice, SAmt, stype, dtype, ...rest },
				index
			) => ({
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod?.ProdID,
				ProdData_N: prod?.ProdData,
				SQty: SQty?.toString() || "",
				SPrice: SPrice?.toString() || "",
				SAmt: SAmt?.toString() || "",
				SType: stype?.id || "",
				SRsnID: dtype?.CodeID || "",
				Seq: index + 1,
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const {
		TxoID,
		TxiDate,
		EmplID,
		EmplData_N,
		ODeptID,
		ODeptName_N,
		OrdIDs,
		InvTxi_S,
		Remark,
		...rest
	} = payload;

	return {
		txoOrder: TxoID
			? {
					撥出單號: TxoID,
			  }
			: null,
		txiDate: Forms.parseDate(TxiDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		txoDept: {
			DeptID: ODeptID,
			AbbrName: ODeptName_N,
		},
		depOrders:
			OrdIDs?.split("|")
				.filter((s) => !!s)
				.map((x) => ({
					["訂貨單號"]: x,
				})) || [],
		prods: transformGridForReading(InvTxi_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { txoOrder, txiDate, employee, txoDept, depOrders, remark, ...rest } =
		payload;
	return {
		TxoID: txoOrder?.撥出單號 || "",
		TxiDate: txiDate ? Forms.formatDate(txiDate) : "",
		EmplID: employee?.CodeID || "",
		ODeptID: txoDept?.DeptID || "",
		OrdIDs: depOrders.map((o) => o["訂貨單號"]).join(","),
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			InvTxi_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { tid, employee, txoDept, ...rest } = data;
	return {
		...(txoDept && {
			todp: txoDept?.DeptID,
		}),
		...(employee && {
			emi: employee.CodeID,
		}),
		...(tid && {
			tid: Forms.formatDate(tid),
		}),
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "tid,employee,txoDept");
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

const C09 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
};

export default C09;
