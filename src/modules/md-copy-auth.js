const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	return `${DeptID} ${AbbrName || DeptName || ""}`;
};

const transformForSubmitting = (payload) => {
	const { fromUser, ...rest } = payload;
	return {
		fromUserId: fromUser.UID,
		...rest,
	};
};

const CopyAuth = {
	transformForSubmitting,
};

export default CopyAuth;
