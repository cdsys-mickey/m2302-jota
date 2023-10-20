import React, {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";

export const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
	const inputRef = useRef(null);

	const [state, setState] = useState({
		data: null,
	});

	return (
		<SideMenuContext.Provider
			value={{
				...state,
				inputRef,
			}}>
			{children}
		</SideMenuContext.Provider>
	);
};
