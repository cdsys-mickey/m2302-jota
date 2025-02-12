const SELECTED = "active";
const UNUSED = "unused";

const droppableIdToType = (droppableId) => {
	if (droppableId === SELECTED) {
		return SELECTED;
	}
	return UNUSED;
};

const JobMenu = {
	SELECTED,
	UNUSED,
	droppableIdToType,
};

export default JobMenu;
