import PropTypes from "prop-types";
import { useOptionPicker } from "./listbox/useOptionPicker";
import { SharedOptionsContext } from "./SharedOptionsContext";

export const SharedOptionsProvider = ({ children, ...rest }) => {
	const optionPicker = useOptionPicker();

	return (
		<SharedOptionsContext.Provider
			value={{
				...optionPicker,
				// override
				...rest,
			}}>
			{children}
		</SharedOptionsContext.Provider>
	);
};

SharedOptionsProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
