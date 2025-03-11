import Forms from "@/shared-modules/Forms.mjs";

const transformForReading = (payload) => {
	const { ActDate, PhyIDs } = payload;
	return {
		ActDate: Forms.parseDate(ActDate),
		PhyIDs,
	};
};
const F05 = {
	transformForReading,
};

export default F05;
