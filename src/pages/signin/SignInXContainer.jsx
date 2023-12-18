import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { SignInContext } from "../../contexts/signin/SignInContext";
import SignInX from "./SignInX";

export const SignInXContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const signin = useContext(SignInContext);
	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={form.handleSubmit(
				signin.onSignInXSubmit,
				signin.onSignInXSubmitError
			)}>
			<SignInX loading={signin.loading} {...rest} />
		</form>
	);
};
