const TABLES = [{ RealFile: "StoreFile_F", RealName: "商品主檔" }];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { RealName } = option;
	return `${RealName}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.RealFile === value?.RealFile;
};

const getById = (id) => {
	return TABLES.find((o) => o.RealFile === id);
};

const Database = {
	TABLES,
	...TABLES,
	getOptionLabel,
	isOptionEqualToValue,
	getById,
};

export default Database;
