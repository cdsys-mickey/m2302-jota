const asToastifyType = (notifyType) => {
	switch (notifyType) {
		default:
			return notifyType?.toLowerCase() || "info";
	}
};

const Messaging = {
	asToastifyType,
};

export default Messaging;
