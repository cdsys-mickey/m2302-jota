const transformForGridEdior = (payload) => {
	return payload.data[0][`A011_W1`];
};

const transformForSubmit = (data) => {
	return data.map((i) => {
		const { ...rest } = i;
		return {
			...rest,
		};
	});
};

const A011 = {
	transformForGridEdior,
	transformForSubmit,
};

export default A011;
