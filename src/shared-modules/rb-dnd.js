const handleDragEndOld = (dragResult, value, onChange) => {
	if (!dragResult.destination) {
		return;
	}
	const fromIndex = dragResult.source.index;
	const toIndex = dragResult.destination.index;
	if (fromIndex === toIndex) {
		return;
	}
	const [removed] = value.splice(fromIndex, 1);
	value.splice(toIndex, 0, removed);
	onChange(value);
};

const handleDragEnd = (value, onChange) => (dragResult) => {
	if (!dragResult.destination) {
		return;
	}
	const fromIndex = dragResult.source.index;
	const toIndex = dragResult.destination.index;
	if (fromIndex === toIndex) {
		return;
	}
	const [removed] = value.splice(fromIndex, 1);
	value.splice(toIndex, 0, removed);
	onChange(value);
};

const RBDnD = {
	handleDragEnd,
};

export default RBDnD;
