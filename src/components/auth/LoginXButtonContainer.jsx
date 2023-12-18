import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { useContext } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { SignInContext } from "../../contexts/signin/SignInContext";

const LoginXButtonContainer = forwardRef((props, ref) => {
	// const app = useAppContext();
	const { children, ...rest } = props;
	const forms = useFormContext();
	const { loading, onSignInXSubmit, onSignInXSubmitError } =
		useContext(SignInContext);

	const handleSubmit = forms.handleSubmit(
		onSignInXSubmit,
		onSignInXSubmitError
	);

	return (
		<LoadingButton
			ref={ref}
			type="submit"
			variant="contained"
			loading={loading}
			endIcon={<LoginIcon />}
			onClick={handleSubmit}
			{...rest}>
			{children}
		</LoadingButton>
	);
});
LoginXButtonContainer.propTypes = {
	children: PropTypes.string,
};

LoginXButtonContainer.displayName = "LoginXButtonContainer";

export default LoginXButtonContainer;
