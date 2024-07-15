/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";
import FreeProdTypes from "./md-free-prod-types";

const transformGridForReading = (data) => {
	return (
		data?.map(
			({
				SProdID,
				ProdData_N,
				SType,
				SRsnID,
				RsnData_N,
				SOrdID,
				SQtyNote,
				...rest
			}) => {
				const fields = SOrdID?.split("#") || [];
				const ordId = fields.length > 0 ? fields[0] : "";

				return {
					prod: {
						ProdID: SProdID,
						ProdData: ProdData_N,
					},
					stype: FreeProdTypes.getOptionById(SType),
					SOrdID,
					ordId,
					overrideSQty: SQtyNote === "*",
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
				{
					Pkey,
					prod,
					SQty,
					SPrice,
					SAmt,
					stype,
					dtype,
					overrideSQty,
					...rest
				},
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
				SQtyNote: overrideSQty ? "*" : "",
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const {
		TxoDate,
		EmplID,
		EmplData_N,
		IDeptID,
		IDeptName_N,
		OrdIDs,
		TrafID,
		TrafData_N,
		DyEmplID,
		DyEmplData_N,
		InvTxo_S,
		Remark,
		SQtyNote,
		...rest
	} = payload;

	return {
		TxoDate: Forms.parseDate(TxoDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		txiDept: {
			DeptID: IDeptID,
			AbbrName: IDeptName_N,
		},
		depOrders:
			OrdIDs?.split("|")
				.filter((s) => !!s)
				.map((x) => ({
					["訂貨單號"]: x,
				})) || [],
		transType: TrafID
			? {
					CodeID: TrafID,
					CodeData: TrafData_N,
			  }
			: null,
		deliveryEmployee: {
			CodeID: DyEmplID,
			CodeData: DyEmplData_N,
		},
		prods: transformGridForReading(InvTxo_S),
		overrideSQty: SQtyNote === "*",
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const {
		TxoID,
		TxoDate,
		employee,
		txiDept,
		deliveryEmployee,
		transType,
		depOrders,
		remark,
		// DROPPING PROPS
		stock,
		prods,
		...rest
	} = payload;

	console.log("DROP props", { stock, prods });

	return {
		TxoID,
		TxoDate: TxoDate ? Forms.formatDate(TxoDate) : "",
		EmplID: employee?.CodeID || "",
		TrafID: transType?.CodeID || "",
		IDeptID: txiDept?.DeptID || "",

		DyEmplID: deliveryEmployee?.CodeID,
		OrdIDs: depOrders.map((o) => o["訂貨單號"]).join(","),
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			InvTxo_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { txoDate, employee, deliveryEmployee, txiDept, transType, ...rest } =
		data;
	return {
		...(txoDate && {
			od: Forms.formatDate(txoDate),
		}),
		...(employee && {
			emp: employee.CodeID,
		}),
		...(deliveryEmployee && {
			dm: deliveryEmployee.CodeID,
		}),
		...(txiDept && {
			ind: txiDept?.DeptID,
		}),
		...(transType && {
			tt: transType.CodeID,
		}),
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"txoDate,employee,deliveryEmployee,txiDept,transType"
	);
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

const C08 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
};

export default C08;
