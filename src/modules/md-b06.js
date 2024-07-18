/* eslint-disable no-mixed-spaces-and-tabs */

import Forms from "../shared-modules/sd-forms";

const OrderBy = Object.freeze({
	SUPPLIER: 1,
	PROD: 2,
});

const options = [
	{ id: OrderBy.SUPPLIER, name: "廠商" },
	{ id: OrderBy.PROD, name: "商品" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const transformForSearchSubmitting = (payload) => {
	const {
		supplier,
		supplier2,
		sprod,
		eprod,
		orderBy,
		outputType,
		date1,
		date2,
		...rest
	} = payload;
	console.log(`filtered props`, outputType);

	return {
		sp1: supplier?.FactID,
		sp2: supplier2?.FactID,
		pi: sprod?.ProdID,
		pi2: eprod?.ProdID,
		ob: orderBy?.id || "",
		dt1: Forms.formatDate(date1),
		dt2: Forms.formatDate(date2),
	};
};

const transformForPrinting = (payload) => {
	const {
		supplier,
		supplier2,
		sprod,
		eprod,
		orderBy,
		outputType,
		date1,
		date2,
		...rest
	} = payload;
	return Forms.processDateFieldsForSubmit(
		{
			Action: outputType?.id,
			JobName: "B06",
			FactID1: supplier?.FactID || "",
			FactID2: supplier2?.FactID || "",
			SProdID1: sprod?.ProdID || "",
			SProdID2: eprod?.ProdID || "",
			OrderBy: orderBy?.id || "",
			InqDate1: Forms.formatDate(date1),
			InqDate2: Forms.formatDate(date2),
			...rest,
		},
		"date1,date2"
	);
};

const paramsToJsonData = (params) => {
	const where = [];

	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const B06 = {
	paramsToJsonData,
	transformForSearchSubmitting,
	transformForPrinting,
	OrderBy,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
};

export default B06;
