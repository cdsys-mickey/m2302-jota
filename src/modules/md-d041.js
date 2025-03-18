/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects";
import FreeProdTypes from "./md-free-prod-types";
import YesOrEmpty from "./md-yes-or-empty";

const transformGridForReading = (data) => {
	return (
		data?.map(
			({
				SProdID,
				ProdData_N,
				SExpDate,
				SType,
				SRsnID,
				RsnData_N,
				SFlag,
				...rest
			}) => {
				return {
					prod: {
						ProdID: SProdID,
						ProdData: ProdData_N,
					},
					ProdData: ProdData_N,
					// reworked: SFlag === "Y",
					reworked: YesOrEmpty.getOptionById(SFlag),
					// SExpDate: Forms.reformatDateAsDash(SExpDate),
					SExpDate: SExpDate,
					stype: FreeProdTypes.getOptionById(SType),
					dtype: SRsnID
						? {
								CodeID: SRsnID,
								CodeData: RsnData_N,
						  }
						: null,
					...rest,
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
				{ Pkey, prod, SExpDate, SQty, stype, dtype, reworked, ...rest },
				index
			) => ({
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod?.ProdID,
				ProdData_N: prod?.ProdData,
				SExpDate: Forms.formatDate(SExpDate),
				SQty: SQty?.toString() || "",
				SType: stype?.id || "",
				SRsnID: dtype?.CodeID || "",
				Seq: index + 1,
				// SFlag: reworked ? "Y" : "",
				SFlag: reworked?.id || "",
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const {
		EntDate,
		PDlineID,
		PDlineData_N,
		EmplID,
		EmplData_N,
		ProdEnt_S,
		Remark,
		...rest
	} = payload;

	return {
		EntDate: Forms.parseDate(EntDate),
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
		prods: transformGridForReading(ProdEnt_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { EntDate, employee, pdline, remark, ...rest } = payload;
	return {
		EntDate: EntDate ? Forms.formatDate(EntDate) : "",
		EmplID: employee?.CodeID || "",
		PDlineID: pdline?.CodeID || "",
		Remark: remark?.split("\n") || [],
		...rest,
		...(gridData && {
			ProdEnt_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee, sdate, pdline } = data;
	return {
		...(employee && {
			empi: employee.CodeID,
		}),
		...(sdate && {
			sdate: Forms.formatDate(sdate),
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
	return Objects.isAnyPropNotEmpty(criteria, "employee,pdline,sdate");
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

const D041 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
	isProdExists,
};

export default D041;
