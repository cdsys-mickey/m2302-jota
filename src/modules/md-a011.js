const transformAsQueryParams = (data) => {
	return {
		pi: data.prodId,
		pn: data.prodName,
		cl: data.catL?.LClas,
		cm: data.catM?.MClas,
		cs: data.catS?.SClas,
		ta: data.typeA?.TypeA,
		tb: data.typeB?.TypeB,
		tx: data.taxType?.Tax,
		sq: data.safeQty,
	};
};

const transformForSubmit = (data) => {
	return data.map((i) => {
		const { ProdID, Price, PriceA, PriceB, PriceC, PriceD, PriceE } = i;
		return {
			ProdID,
			Price,
			PriceA,
			PriceB,
			PriceC,
			PriceD,
			PriceE,
		};
	});
};

const A011 = {
	transformAsQueryParams,
	transformForSubmit,
};

export default A011;
