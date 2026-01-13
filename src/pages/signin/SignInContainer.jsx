import { SignInContext } from "@/contexts/signin/SignInContext";
import usePWAVersionCheck from "@/shared-hooks/usePWAVersionCheck";
import { useContext } from "react";
import SignInView from "./SignInView";

export const SignInContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);

	const { newVersion } = usePWAVersionCheck({
		autoRefresh: true,
		// autoPrompt: true,
		autoToastUpdated: true
	});

	// useChangeTracking(() => {
	// 	if (newVersion) {
	// 		toastEx.error(`偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新後才能登入`, {
	// 			autoClose: false
	// 		})
	// 	}
	// }, [newVersion]);

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
				newVersion={newVersion}
				// #for dev use
				// newVersion="9999.01.01"
				{...rest}
			/>
		</form>

	);
};
