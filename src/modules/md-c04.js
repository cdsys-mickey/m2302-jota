/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const transformForGrid = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, ...rest }) => ({
			prod: {
				ProdID: SProdID,
				ProdData: ProdData_N,
			},

			...rest,
		})) || []
	);
};

const transformForReading = (payload) => {
	const {
		GinDate,
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
		FactData,
		prods: transformForGrid(GdsIn_S),
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
	transformForGrid,
};

export default C04;
