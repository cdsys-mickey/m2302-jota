import { SignInContext } from "@/contexts/signin/SignInContext";
import { FormMetaProvider } from "@/shared-components";
import { useContext } from "react";
import SignInX from "./SignInX";

export const SignInXContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const signin = useContext(SignInContext);
	return (
		<FormMetaProvider {...signin.formMeta}>
			<form
				noValidate
				autoComplete="off"
				// onSubmit={form.handleSubmit(
				// 	signin.signInXSubmitHandler({ setFocus: form.setFocus }),
				// 	signin.onSignInXSubmitError
				// )}
				onSubmit={signin.handleSubmitX}
			>
				<SignInX loading={signin.loading} {...rest} />
			</form>
		</FormMetaProvider>
	);
};
