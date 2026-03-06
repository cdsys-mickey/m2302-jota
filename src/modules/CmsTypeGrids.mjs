const findDupIndex = ({ newValue, rowData, rowIndex }) => {
	if (!rowData?.cmsType?.CodeID) {
		return -1;
	}

	const targetId = rowData.cmsType.CodeID;

	for (let i = 0; i < newValue.length; i++) {
		if (i !== rowIndex && newValue[i]?.cmsType?.CodeID === targetId) {
			return i;
		}
	}

	return -1;
};

const CmsTypeGrids = {
	findDupIndex,
};

export default CmsTypeGrids;
