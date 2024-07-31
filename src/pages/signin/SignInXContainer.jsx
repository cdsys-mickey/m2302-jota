import { SignInContext } from "@/contexts/signin/SignInContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FormManagerProvider } from "@/shared-contexts/form-manager/FormManagerProvider";
import SignInX from "./SignInX";

export const SignInXContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const signin = useContext(SignInContext);
	return (
		<FormManagerProvider {...signin.formManager}>
			<form
				noValidate
				autoComplete="off"
				onSubmit={form.handleSubmit(
					signin.signInXSubmitHandler({ setFocus: form.setFocus }),
					signin.onSignInXSubmitError
				)}>
				<SignInX loading={signin.loading} {...rest} />
			</form>
		</FormManagerProvider>
	);
};
