import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import useSignIn from "@/contexts/useSignIn";

const LoginButtonContainer = forwardRef((props, ref) => {
	// const app = useAppContext();
	const { children, ...rest } = props;
	const forms = useFormContext();
	const { loading, onSignInSubmit, onSignInSubmitError } = useSignIn();

	const handleSubmit = forms.handleSubmit(
		onSignInSubmit,
		onSignInSubmitError
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
LoginButtonContainer.propTypes = {
	children: PropTypes.string,
};

LoginButtonContainer.displayName = "LoginButtonContainer";

export default LoginButtonContainer;
