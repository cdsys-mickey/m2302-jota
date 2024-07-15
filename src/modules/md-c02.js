/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const ListModes = Object.freeze({
	NOT_REVIEWED: 1,
	REVIEWED: 2,
	ALL: 3,
});

const options = [
	{ id: ListModes.NOT_REVIEWED, label: "待覆核" },
	{ id: ListModes.REVIEWED, label: "已覆核" },
	{ id: ListModes.ALL, label: "全部" },
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
		RqtDate: Forms.formatDate(RqtDate),
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

const C02 = {
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

export default C02;
