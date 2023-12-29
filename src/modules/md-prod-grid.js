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

const ProdGrid = {
	transformAsQueryParams,
};

export default ProdGrid;
