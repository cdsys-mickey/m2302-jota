const transformForReading = (payload) => {
	return payload.data[0][`A013_W1`];
};

const transformForSubmitting = (data, dirtyIds) => {
	return data
		.filter((x) => {
			if (dirtyIds && dirtyIds.size > 0) {
				return dirtyIds.has(x.ProdID);
			}
			return false;
		})
		.map((i) => {
			const { ProdID, ProdData } = i;
			return {
				ProdID,
				ProdData,
				SRate: i.SRate?.toString() || "",
				IRate: i.IRate?.toString() || "",
				MRate: i.MRate?.toString() || "",
			};
		});
};

const A013 = {
	transformForReading,
	transformForSubmitting,
};

export default A013;
