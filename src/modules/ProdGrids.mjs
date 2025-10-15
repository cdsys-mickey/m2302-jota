const transformAsQueryParams = (data) => {
	return {
		pi: data.prodId,
		pn: data.prodName,
		cl: data.catL?.LClas,
		cm: data.catM?.MClas,
		cs: data.catS?.SClas,
		ta: data.typeA?.id,
		tb: data.typeB?.id,
		tx: data.taxType?.id,
		sq: data.safeQty,
	};
};

const ProdGrid = {
	transformAsQueryParams,
};

export default ProdGrid;
