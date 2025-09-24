import { SignInContext } from "@/contexts/signin/SignInContext";
import { useContext } from "react";
import SignInView from "./SignInView";

export const SignInContainer = (props) => {
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
			onSubmit={signin.handleSubmit}
		>
			<SignInView
				loading={signin.loading}
				hideCaptcha={signin.hideCaptcha}
				{...rest}
			/>
		</form>

	);
};
