import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { SignInContext } from "@/contexts/signin/SignInContext";
import { FormManagerProvider } from "@/shared-contexts/form-manager/FormManagerProvider";
import SignIn from "./SignIn";

export const SignInContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const signin = useContext(SignInContext);
	return (
		<FormManagerProvider {...signin.formManager}>
			<form
				noValidate
				autoComplete="off"
				onSubmit={form.handleSubmit(
					signin.signInSubmitHandler({ setFocus: form.setFocus }),
					signin.onSignInSubmitError
				)}>
				<SignIn loading={signin.loading} {...rest} />
			</form>
		</FormManagerProvider>
	);
};
