const transformForGridEdior = (payload) => {
	return payload.data[0][`A011_W1`];
};

const transformForSubmit = (data, dirtyIds) => {
	console.log(`data`, data);
	console.log(`dirtyIds`, dirtyIds);
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
				Price: i.Price?.toString() || "",
				PriceA: i.PriceA?.toString() || "",
				PriceB: i.PriceB?.toString() || "",
				PriceC: i.PriceC?.toString() || "",
				PriceD: i.PriceD?.toString() || "",
				PriceE: i.PriceE?.toString() || "",
			};
		});
};

const A011 = {
	transformForGridEdior,
	transformForSubmit,
};

export default A011;
