import { SignInContext } from "@/contexts/signin/SignInContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useVersionCheck from "@/shared-hooks/useVersionCheck";
import { useContext } from "react";
import { toastEx } from "shared-components/toast-ex";
import SignInView from "./SignInView";

export const SignInContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);

	const { newVersion } = useVersionCheck({ autoPrompt: false });

	useChangeTracking(() => {
		if (newVersion) {
			toastEx.error(`偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新後才能登入`, {
				autoClose: false
			})
		}
	}, [newVersion]);

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
