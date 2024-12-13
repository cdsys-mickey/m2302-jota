/* eslint-disable no-mixed-spaces-and-tabs */

import Forms from "@/shared-modules/sd-forms";

const transformGridForReading = (data) => {
	return (
		data?.map((i) => {
			const { SPhyID, SPhyData_N, ...rest } = i;
			return {
				listing: SPhyID
					? {
							PhyID: SPhyID,
							PhyData: SPhyData_N,
					  }
					: null,
				PhyData: SPhyData_N,
				...rest,
			};
		}) || []
	);
};

const transformGridForSubmitting = (gridData) => {
	return gridData
		.filter((x) => x.listing?.PhyID)
		.map((x) => {
			const { listing } = x;
			return {
				SPhyID: listing?.PhyID,
			};
		});
};

const transformForReading = (payload) => {
	const { ActDate, PhyAct_S, ...rest } = payload;
	return {
		ActDate: Forms.parseDate(ActDate),
		prods: transformGridForReading(PhyAct_S),
		...rest,
	};
};

const transformForSubmitting = (formData, gridData) => {
	const { ActDate } = formData;
	return {
		ActDate: Forms.formatDate(ActDate),
		PhyAct_S: transformGridForSubmitting(gridData),
	};
};

const createRow = () => ({
	listing: null,
	PhyData: "",
});

const F02 = {
	transformGridForReading,
	transformGridForSubmitting,
	transformForReading,
	transformForSubmitting,
	createRow,
};

export default F02;
