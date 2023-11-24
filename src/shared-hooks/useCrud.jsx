import { useMemo } from "react";
import { useCallback, useState } from "react";

export const useCrud = (props = {}) => {
	const { viewWithPopper = false } = props;
	const [item, setItem] = useState();
	const [itemLoading, setItemLoading] = useState(false);
	const [state, setState] = useState({
		editing: false,
		viewing: false,
		creating: false,
	});

	const [popperOpen, setPopperOpen] = useState(false);

	const togglePopperOpen = useCallback(() => {
		console.log("handlePopperToggle");
		setPopperOpen((prev) => !prev);
	}, []);

	const handleViewing = useCallback(
		(e, value) => {
			console.log("handleViewing", value);
			e?.stopPropagation();
			setState((prev) => ({
				...prev,
				viewing: true,
				creating: false,
				editing: false,
			}));
			if (viewWithPopper) {
				setPopperOpen(true);
			}
		},
		[viewWithPopper]
	);

	const handleCreating = useCallback((e) => {
		console.log("handleCreating");
		e?.stopPropagation();
		setState((prev) => ({
			...prev,
			creating: true,
			editing: false,
			viewing: false,
		}));
		// goEditing();
	}, []);

	const handleEditing = useCallback((e) => {
		console.log("handleEditing");
		e?.stopPropagation();
		setState((prev) => ({
			...prev,
			editing: true,
			creating: false,
			viewing: false,
		}));
		// goEditing();
	}, []);

	const cancelAction = useCallback(() => {
		setState((prev) => ({
			...prev,
			viewing: false,
			editing: false,
			creating: false,
		}));
		setPopperOpen(false);
	}, []);

	const dialogOpen = useMemo(
		() =>
			(state.viewing && viewWithPopper) ||
			state.editing ||
			state.creating,
		[state.creating, state.editing, state.viewing, viewWithPopper]
	);

	return {
		...state,
		dialogOpen,
		handleEditing,
		handleViewing,
		handleCreating,
		cancelAction,
		itemLoading,
		// Popper
		popperOpen,
		togglePopperOpen,
		item,
	};
};
