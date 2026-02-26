import { SignInContext } from "@/contexts/signin/SignInContext";
import usePWAVersionCheck from "@/shared-hooks/usePWAVersionCheck";
import { useContext } from "react";
import SignInView from "./SignInView";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useRunOnce } from "shared-components";

export const SignInContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);
	const dialogs = useContext(DialogsContext);
	const { newVersion, applyUpdate } = usePWAVersionCheck({
		autoUpdate: false,
		autoPrompt: false,
	});

	useChangeTracking(() => {
		if (newVersion) {
			// toastEx.error(`偵測到新版本 ${newVersion}，必須更新後才能登入`, {
			// 	autoClose: false
			// })
			dialogs.confirm({
				title: `發現新版本 ${newVersion}`,
				message: `必須更新後才能登入`,
				onConfirm: () => {
					applyUpdate(); // 呼叫剛才寫好的非同步更新邏輯
				},
				confirmText: "確定更新"
			});
		}
	}, [newVersion]);

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
			onSubmit={signin.handleSubmit}
		>
			<SignInView
				loading={signin.loading}
				hideCaptcha={signin.hideCaptcha}
				newVersion={newVersion}
				applyUpdate={applyUpdate}
				// #for dev use
				// newVersion="9999.01.01"
				{...rest}
			/>
		</form>

	);
};
