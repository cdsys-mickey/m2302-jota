const transformForGridEdior = (payload) => {
	return payload.data[0][`A015_W1`];
};

const transformForSubmit = (data, dirtyIds) => {
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
	transformForGridEdior,
	transformForSubmit,
};

export default A015;
