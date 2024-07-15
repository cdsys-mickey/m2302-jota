const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	return `${DeptID} ${AbbrName || DeptName || ""}`;
};

const transformForSubmit = (payload) => {
	const { fromUser, ...rest } = payload;
	return {
		fromUserId: fromUser.UID,
		...rest,
	};
};

const CopyAuth = {
	transformForSubmit,
};

export default CopyAuth;
