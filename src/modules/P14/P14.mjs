/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";

const transformForGridImport = (data) => {
	return (
		data?.map(({ ProdID, ProdData, ...rest }) => ({
			Pkey: nanoid(),
			prod: {
				ProdID: ProdID,
				ProdData: ProdData,
			},
			ProdData_N: ProdData,
			// Force: null,
			Force: false,
			...rest,
		})) || []
	);
};

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, Force, Repeat_N, Seq, ...rest }) => ({
			prod: {
				ProdID: SProdID,
				ProdData: ProdData_N,
			},
			ProdData_N,
			// Force: YesOrEmpty.getOptionById(Force),
			Force: Force === "Y",
			Repeat_N: Repeat_N ? "*" : "",
			Seq,
			...rest,
		})) || []
	);
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map(({ prod, Force }, index) => ({
			SProdID: prod?.ProdID,
			Seq: index + 1,
			// Force: Force?.id ?? "",
			Force: Force ? "Y" : "",
		}));
};

const transformForReading = (payload) => {
	const { DayItm_S, ...rest } = payload;

	return {
		prods: transformGridForReading(DayItm_S),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { ItmID, ItmData } = payload;
	return {
		ItmID,
		ItmData,
		...(gridData && {
			DayItm_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {
		prod1: data.sprod?.ProdID,
		prod2: data.eprod?.ProdID,
	};
};

const P14 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
};

export default P14;
