const forKey = (e) => {
	let result = "";
	if (e.shiftKey) {
		result += "shift+";
	}
	if (e.ctrlKey) {
		result += "ctrl+";
	}
	if (e.altKey) {
		result += "alt+";
	}
	result += e.key;
	return result;
};

const Events = {
	forKey,
};

export default Events;
