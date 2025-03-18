import { FormMetaContext } from "./FormMetaContext";
import PropTypes from "prop-types";

export const FormMetaProvider = ({ children, ...rest }) => {
	return (
		<FormMetaContext.Provider
			value={{
				...rest,
			}}>
			{children}
		</FormMetaContext.Provider>
	);
};

FormMetaProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
FormMetaProvider.displayName = "FormMetaProvider"