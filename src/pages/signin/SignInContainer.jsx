import { SignInContext } from "@/contexts/signin/SignInContext";
import { useContext } from "react";
import SignInView from "./SignInView";
import useVersionCheck from "@/shared-hooks/useVersionCheck";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const SignInContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);

	const { isRefreshRequired, promptRefresh } = useVersionCheck({ autoPrompt: false });

	useChangeTracking(() => {
		if (isRefreshRequired) {
			setTimeout(promptRefresh, 1000);
		}
	}, [isRefreshRequired]);

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
				isRefreshRequired={isRefreshRequired}
				{...rest}
			/>
		</form>

	);
};
