import { RHFTabTestContext } from "./RHFTabTestContext";
import PropTypes from "prop-types";
import { useRHFTabTest } from "./useRHFTabTest";

export const RHFTabTestProvider = ({ children }) => {
	const rhfTabTest = useRHFTabTest();

	return (
		<RHFTabTestContext.Provider
			value={{
				...rhfTabTest,
			}}>
			{children}
		</RHFTabTestContext.Provider>
	);
};

RHFTabTestProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
