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
