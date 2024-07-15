/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";
import Objects from "../shared-modules/sd-objects";

const transformGridForReading = (data) => {
	return (
		data?.map(
			({
				SProdID,
				ProdData_N,
				SRsnID,
				RsnData_N,
				SCustID,
				CustData_N,
				SDeptID,
				DeptData_N,
				...rest
			}) => {
				return {
					prod: {
						ProdID: SProdID,
						ProdData: ProdData_N,
					},
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
				{ Pkey, prod, SQty, SAmt, dept, dtype, customer, ...rest },
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

const D05 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
};

export default D05;
