import { useCallback, useState } from "react";

export const useCrud = () => {
	const [itemData, setItemData] = useState();

	const [itemLoading, setItemLoading] = useState();
	const [state, setState] = useState({
		creating: false,
		reading: false,
		updating: false,
		deleting: false,
	});
	const [editing, setEditing] = useState(false);
	const [working, setWorking] = setState(false);
	const [prompting, setPrompting] = setState(false);

	const handleCreating = useCallback(() => {
		setState((prev) => ({
			...prev,
			creating: true,
			updating: false,
			deleting: false,
		}));
		setEditing(true);
	}, []);

	const handleReading = useCallback(() => {
		setState((prev) => ({
			...prev,
			creating: false,
			reading: true,
			updating: false,
			deleting: false,
		}));
		setEditing(true);
	}, []);

	return {
		Method,
	};
};
