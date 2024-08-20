const transformForReading = (payload) => {
	return payload.data[0][`A015_W1`];
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
			const { ...rest } = i;
			return {
				...rest,
				SafeQty: i.SafeQty?.toString() || "",
			};
		});
};

const A015 = {
	transformForReading,
	transformForSubmitting,
};

export default A015;
