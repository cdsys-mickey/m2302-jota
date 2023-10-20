import React, { createContext, useCallback, useContext, useState } from "react";

const ZZEditableContext = createContext();

export const useEditable = () => {
	return useContext(ZZEditableContext);
};

export const EditableProvider = ({ children }) => {
	const [state, setState] = useState({
		editing: false,
	});

	const goEditing = useCallback(() => {
		setState((prev) => ({
			...prev,
			editing: true,
		}));
	}, []);

	const cancelEditing = useCallback(() => {
		setState((prev) => ({
			...prev,
			editing: false,
		}));
	}, []);

	return (
		<ZZEditableContext.Provider
			value={{
				...state,
				goEditing,
				cancelEditing,
			}}>
			{children}
		</ZZEditableContext.Provider>
	);
};
