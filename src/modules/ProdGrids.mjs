const findDupProdIndex = ({ newValue, rowData, rowIndex }) => {
	if (!rowData?.prod?.ProdID) {
		return -1;
	}

	const targetProdID = rowData.prod.ProdID;

	for (let i = 0; i < newValue.length; i++) {
		if (i !== rowIndex && newValue[i]?.prod?.ProdID === targetProdID) {
			return i;
		}
	}

	return -1;
};

const foundDupProd = ({ newValue, rowData, rowIndex }) => {
	const result = findDupProdIndex({ newValue, rowData, rowIndex });
	return result !== -1;
};

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

const ProdGrids = {
	findDupProdIndex,
	foundDupProd,
	transformAsQueryParams,
};

export default ProdGrids;
