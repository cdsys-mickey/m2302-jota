/* eslint-disable no-mixed-spaces-and-tabs */
import Objects from "@/shared-modules/Objects";
import Forms from "../shared-modules/Forms.mjs";
import FreeProdTypes from "./md-free-prod-types";

const transformGridForReading = (data) => {
	return (
		data?.map(
			({ SProdID, ProdData_N, SExpDate, SOrdID, SType, ...rest }) => {
				const fields = SOrdID?.split("#") || [];
				const ordId = fields.length > 0 ? fields[0] : "";
				return {
					prod: {
						ProdID: SProdID,
						ProdData: ProdData_N,
					},
					ProdData: ProdData_N,
					// SExpDate: Forms.reformatDateAsDash(SExpDate),
					SExpDate: SExpDate,
					SOrdID,
					ordId,
					stype: FreeProdTypes.getOptionById(SType),
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
				{ Pkey, prod, stype, SExpDate, SQty, SPrice, SAmt, ...rest },
				index
			) => ({
				Pkey: Pkey?.length < 36 ? "" : Pkey,
				SProdID: prod?.ProdID,
				ProdData_N: prod?.ProdData,
				SType: stype?.id || "",
				SExpDate: Forms.formatDate(SExpDate),
				SQty: SQty?.toString() || "",
				SPrice: SPrice?.toString() || "",
				SAmt: SAmt?.toString() || "",
				Seq: index + 1,
				...rest,
			})
		);
};

const transformForReading = (payload) => {
	const {
		GinDate,
		OrdID,
		EmplID,
		EmplData_N,
		FactID,
		FactData,
		GdsIn_S,
		Remark,
		...rest
	} = payload;

	return {
		GinDate: Forms.parseDate(GinDate),
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
		purchaseOrders:
			OrdID?.split("|")
				.filter((s) => !!s)
				.map((x) => ({
					["採購單號"]: x,
				})) || [],
		OrdID,
		FactData,
		prods: transformGridForReading(GdsIn_S),
		remark: Remark.join("\n"),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const {
		GinID,
		GinDate,
		employee,
		supplier,
		remark,
		purchaseOrders,
		...rest
	} = payload;
	return {
		GinID,
		GinDate: GinDate ? Forms.formatDate(GinDate) : "",
		EmplID: employee?.CodeID || "",
		FactID: supplier?.FactID || "",
		Remark: remark?.split("\n") || [],
		OrdID: purchaseOrders.map((o) => o["採購單號"]).join(","),
		...rest,
		...(gridData && {
			GdsIn_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee, supplier, rstDate, ...rest } = data;
	return {
		...rest,
		...(employee && {
			emp: employee.CodeID,
		}),
		...(supplier && {
			spl: supplier?.FactID,
		}),
		...(rstDate && {
			rdat: Forms.formatDate(rstDate),
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
	return Objects.isAnyPropNotEmpty(criteria, "id,pn,bc");
};

const C04 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	getTotal,
	isFiltered,
};

export default C04;
