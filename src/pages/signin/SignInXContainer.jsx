import { SignInContext } from "@/contexts/signin/SignInContext";
import { useContext } from "react";
import SignInXView from "./SignInXView";

export const SignInXContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);
	return (
		<form
			noValidate
			autoComplete="off"
			// onSubmit={form.handleSubmit(
			// 	signin.signInSubmitHandler({ setFocus: form.setFocus, hideCaptcha: signin.hideCaptcha }),
			// 	signin.onSignInSubmitError
			// )}
			onSubmit={signin.handleSubmitX}
		>
			<SignInXView
				loading={signin.loading}
				hideCaptcha={signin.hideCaptcha}
				{...rest}
			/>
		</form>

	);
};
