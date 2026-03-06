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

const ProdGrids = {
	findDupProdIndex,
	foundDupProd,
};

export default ProdGrids;
