const { useState } = require("react");

export const useActionState = () => {
	const [actionState, setActionState] = useState({
		action: null,
		actionLoading: null,
		actionTarget: null,
		actionError: null,
	});
	return [actionState, setActionState];
};
