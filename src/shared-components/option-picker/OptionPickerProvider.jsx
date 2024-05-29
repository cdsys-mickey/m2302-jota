import { OptionPickerContext } from "./listbox/OptionPickerContext";
import PropTypes from "prop-types";
import { useOptionPicker } from "./listbox/useOptionPicker";

export const OptionPickerProvider = ({ children, ...rest }) => {
	const optionPicker = useOptionPicker();

	return (
		<OptionPickerContext.Provider
			value={{
				...optionPicker,
				// override
				...rest,
			}}>
			{children}
		</OptionPickerContext.Provider>
	);
};

OptionPickerProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
