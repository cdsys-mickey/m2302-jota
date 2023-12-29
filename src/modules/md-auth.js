const COOKIE_MODE = "md";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_REMEMBER_ME = "rememberMe";

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
	COOKIE_MODE,
	COOKIE_ACCOUNT,
	COOKIE_LOGKEY,
	COOKIE_REMEMBER_ME,
};

export default Auth;
