import React, { createContext, useContext, useState } from "react";

const XXOptionContext = createContext();

export const useOptionContext = () => {
	return useContext(OptionContext);
};

const XXOptionContextProvider = ({ children }) => {
	const [state, setState] = useState({
		data: null,
	});

	return (
		<XXOptionContext.Provider
			value={{
				data: state.data,
			}}>
			{children}
		</XXOptionContext.Provider>
	);
};
export default XXOptionContextProvider;
