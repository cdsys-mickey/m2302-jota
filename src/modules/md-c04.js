/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, SExpDate, SOrdID, ...rest }) => {
			const fields = SOrdID.split("#");
			const ordId = fields.length > 0 ? fields[0] : "";
			return {
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
				},
				SExpDate: SExpDate ? Forms.parseDate(SExpDate) : "",
				SOrdID,
				ordId,
				...rest,
			};
		}) || []
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
	return {};
};

const C04 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
};

export default C04;
