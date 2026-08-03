import Forms from "@/shared-modules/Forms.mjs";

const TabType = Object.freeze({
	SALES_DATA: "SALES_DATA",
	POS_DATA: "POS_DATA",
	INIT_QTY: "INIT_QTY",
});

const tabs = [
	{
		id: TabType.SALES_DATA,
		label: "銷售資料",
	},
	{
		id: TabType.POS_DATA,
		label: "POS資料",
	},
	{
		id: TabType.INIT_QTY,
		label: "期初庫存重整",
	},
];

const getTabById = (id) => {
	return tabs.find((tab) => tab.id == id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const transformForSubmitting = (payload) => {
	const { dept, beginDate, endDate } = payload;

	return {
		dept: dept?.DeptID ?? "",
		beginDate: Forms.formatDate(beginDate) ?? "",
		endDate: Forms.formatDate(endDate) ?? "",
	};
};

const transformForPosRebuildSubmitting = (payload) => {
	const { dept, beginDate, endDate } = payload;

	return {
		dept: dept?.DeptID ?? "",
		beginDate: Forms.formatDate(beginDate) ?? "",
		endDate: Forms.formatDate(endDate) ?? "",
	};
};

const REB = {
	TabType,
	tabs,
	getTabById,
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
	transformForPosRebuildSubmitting,
};

export default REB;
