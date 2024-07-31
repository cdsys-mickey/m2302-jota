import { InputTestContext } from "./InputTestContext";
import PropTypes from "prop-types";
import { useInputTest } from "./useInputTest";

export const InputTestProvider = ({ children }) => {
	const inputTest = useInputTest();

	return (
		<InputTestContext.Provider
			value={{
				...inputTest,
			}}>
			{children}
		</InputTestContext.Provider>
	);
};

InputTestProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
