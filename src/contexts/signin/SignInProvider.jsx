import PropTypes from "prop-types";
import { SignInContext } from "./SignInContext";
import { useSignIn } from "./useSignIn";

export const SignInProvider = ({ children }) => {
	const signin = useSignIn();

	return (
		<SignInContext.Provider
			value={{
				...signin,
			}}>
			{children}
		</SignInContext.Provider>
	);
};

SignInProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
