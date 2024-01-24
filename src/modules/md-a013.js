const transformForGridEdior = (payload) => {
	return payload.data[0][`A013_W1`];
};

const transformForSubmit = (data) => {
	return data.map((i) => {
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
	transformForGridEdior,
	transformForSubmit,
};

export default A013;
