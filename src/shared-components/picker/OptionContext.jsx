import React, { createContext, useContext, useState } from "react";

const OptionContext = createContext();

export const useOptionContext = () => {
	return useContext(OptionContext);
};

const OptionContextProvider = ({ children }) => {
	const [state, setState] = useState({
		data: null,
	});

	return (
		<OptionContext.Provider
			value={{
				data: state.data,
			}}>
			{children}
		</OptionContext.Provider>
	);
};
export default OptionContextProvider;
