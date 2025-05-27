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
		.map(({ Pkey, prod, SQty, SPrice, SAmt, ...rest }, index) => ({
			Pkey: Pkey?.length < 36 ? "" : Pkey,
			SProdID: prod?.ProdID,
			ProdData_N: prod?.ProdData,
			SQty: SQty?.toString() || "",
			SPrice: SPrice?.toString() || "",
			SAmt: SAmt?.toString() || "",
			Seq: index + 1,
			...rest,
		}));
};

const transformForReading = (payload) => {
	const {
		GrtDate,
		EmplID,
		EmplData_N,
		FactID,
		FactData,
		GdsRt_S,
		Remark,
		...rest
	} = payload;

	return {
		GrtDate: Forms.parseDate(GrtDate),
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		supplier: FactID
			? {
					FactID: FactID,
					FactData: FactData,
			  }
			: null,
		FactData,
		prods: transformGridForReading(GdsRt_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { GrtID, GrtDate, employee, supplier, remark, prod, prods, ...rest } =
		payload;
	console.log("dropped props", prod, prods);
	return {
		GrtID,
		GrtDate: GrtDate ? Forms.formatDate(GrtDate) : "",
		EmplID: employee?.CodeID || "",
		FactID: supplier?.FactID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			GdsRt_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { supplier, rd, rd2, employee, taxType, ...rest } = data;
	return {
		...(taxType && {
			tt: taxType?.id,
		}),
		...(supplier && {
			spi: supplier.FactID,
		}),
		...(employee && {
			emi: employee.CodeID,
		}),
		...(rd && {
			rd: Forms.formatDate(rd),
		}),
		...(rd2 && {
			rd2: Forms.formatDate(rd2),
		}),
		...rest,
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"supplier,spn,spa,spu,rd,employee,taxType"
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

const C05 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
};

export default C05;
