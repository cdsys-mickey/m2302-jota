const getItemById = (data, id) => {
	let targetItem = null;
	for (const moduleKey in data) {
		const module = data[moduleKey];
		const items = module.items;
		const foundItem = items.find((item) => item.id === id);

		if (foundItem) {
			targetItem = foundItem;
			break;
		}
	}
	return targetItem;
};

const Auth = {
	getItemById,
};

export default Auth;
