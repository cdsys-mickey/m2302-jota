const transformForGridEdior = (payload) => {
	return payload.data[0][`A015_W1`];
};

const transformForSubmit = (data) => {
	return data.map((i) => {
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
