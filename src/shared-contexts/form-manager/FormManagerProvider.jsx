import { FormManagerContext } from "./FormManagerContext";
import PropTypes from "prop-types";

export const FormManagerProvider = ({
	children,
	// fields, isDisabled ,
	...rest
}) => {
	return (
		<FormManagerContext.Provider
			value={{
				// fields,
				// isDisabled,
				...rest,
			}}>
			{children}
		</FormManagerContext.Provider>
	);
};

FormManagerProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
