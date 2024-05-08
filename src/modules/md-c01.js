/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const ListModes = Object.freeze({
	NOT_ORDERED_INCLUDED: 3,
	ORDERED: 2,
	ALL_NOT_ORDERED: 1,
	ALL: 0,
});

const options = [
	{ id: ListModes.NOT_ORDERED_INCLUDED, label: "包含未採購" },
	{ id: ListModes.ORDERED, label: "整單已採購" },
	{ id: ListModes.ALL, label: "全部" },
	{ id: ListModes.ALL_NOT_ORDERED, label: "整單未採購" },
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

const transformForGrid = (data) => {
	return (
		data?.map(
			({
				SProdID,
				ProdData_N,
				PackData_N,
				StockQty_N,
				SFactID,
				SFactNa,
				...rest
			}) => ({
				prod: {
					ProdID: SProdID,
					ProdData: ProdData_N,
					// 複製包裝單位、庫存
					PackData_N,
					StockQty: StockQty_N,
				},
				PackData_N,
				StockQty_N,
				supplier: {
					FactID: SFactID,
					FactData: SFactNa,
				},
				SFactNa,
				...rest,
			})
		) || []
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
		prods: transformForGrid(GdsRqt_S),
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
							supplier,
							SFactNa,
							SOrdID,
						},
						index
					) => ({
						Pkey: Pkey?.length < 36 ? "" : Pkey,
						SProdID: prod?.ProdID,
						SRqtQty: SRqtQty?.toString() || "",
						SOrdQty: SOrdQty?.toString() || "",
						SFactID: supplier?.FactID,
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

const C01 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGrid,
	// 列表模式
	ListModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
};

export default C01;
