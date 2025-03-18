/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "../shared-modules/Objects";

const transformGridForReading = (data) => {
	return (
		data?.map(({ ...rest }) => {
			return {
				...rest,
			};
		}) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((v) => v.SProdID)
		.map(({ SProdID, SQty }, index) => ({
			SProdID,
			SQty: SQty?.toString() || "",
			Seq: index + 1,
		}));
};

const transformForReading = (payload) => {
	const { ActDate_N, F03_S, ...rest } = payload;

	return {
		ActDate_N: Forms.parseDate(ActDate_N),
		prods: transformGridForReading(F03_S),
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { PhyID } = payload;
	return {
		PhyID,
		...(gridData && {
			F03_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	const { employee } = data;
	return {};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "employee");
};

const F03 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformGridForReading,
	isFiltered,
};

export default F03;
