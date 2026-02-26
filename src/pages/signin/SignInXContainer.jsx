import { SignInContext } from "@/contexts/signin/SignInContext";
import { useContext } from "react";
import SignInXView from "./SignInXView";
import { useRunOnce } from "shared-components";
// import useVersionCheck from "@/shared-hooks/useVersionCheck";
// import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const SignInXContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);

	// useChangeTracking(() => {
	// 	if (isRefreshRequired) {
	// 		setTimeout(promptRefresh, 1000);
	// 	}
	// }, [isRefreshRequired]);

	useRunOnce(() => {
		signin.clearLogKey();
	})

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
				// isRefreshRequired={isRefreshRequired}
				{...rest}
			/>
		</form>

	);
};
