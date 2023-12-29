const transformForGridEdior = (payload) => {
	return payload.data[0][`A013_W1`];
};

const transformForSubmit = (data) => {
	return data.map((i) => {
		const { ProdID, ProdData, SRate, IRate, MRate } = i;
		return {
			ProdID,
			ProdData,
			SRate,
			IRate,
			MRate,
		};
	});
};

const A013 = {
	transformForGridEdior,
	transformForSubmit,
};

export default A013;
