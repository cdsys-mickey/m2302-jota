import { useCallback, useState } from "react";
import ZZCrudContext from "./ZZCrudContext";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const ZZCrudProvider = ({ children }) => {
	const [state, setState] = useState({
		editing: false,
		viewing: false,
		creating: false,
	});

	// const goEditing = useCallback(() => {
	// 	setState((prev) => ({
	// 		...prev,
	// 		editing: true,
	// 	}));
	// }, []);

	// const cancelEditing = useCallback(() => {
	// 	setState((prev) => ({
	// 		...prev,
	// 		editing: false,
	// 	}));
	// }, []);

	// Popper

	const [popperState, setPopperState] = useState({
		popperOpen: false,
		criteria: null,
	});

	const handlePopperToggle = useCallback(() => {
		console.log("handlePopperToggle");
		setPopperState((prev) => ({
			...prev,
			popperOpen: !prev.popperOpen,
		}));
	}, []);

	const handlePopperOpen = useCallback(() => {
		console.log("handlePopperOpen");
		setPopperState((prev) => ({
			...prev,
			popperOpen: true,
		}));
	}, []);

	const handlePopperClose = useCallback(() => {
		console.log("handlePopperClose");
		setPopperState((prev) => ({
			...prev,
			popperOpen: false,
		}));
	}, []);

	const handleViewing = useCallback((e) => {
		console.log("handleViewing");
		e?.stopPropagation();
		setState((prev) => ({
			...prev,
			viewing: true,
			creating: false,
			editing: false,
		}));
		// cancelEditing();
	}, []);

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
		// cancelEditing();
	}, []);

	const dialogOpen = useMemo(
		() => state.viewing || state.editing || state.creating,
		[state.creating, state.editing, state.viewing]
	);

	return (
		<ZZCrudContext.Provider
			value={{
				...state,
				dialogOpen,
				handleEditing,
				handleViewing,
				handleCreating,
				cancelAction,
				// Popper
				...popperState,
				handlePopperToggle,
				handlePopperClose,
				handlePopperOpen,
			}}>
			{children}
		</ZZCrudContext.Provider>
	);
};

ZZCrudProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
