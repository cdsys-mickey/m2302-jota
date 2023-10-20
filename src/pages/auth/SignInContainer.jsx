import { forwardRef } from "react";
import SignIn from "./SignIn";

const SignInContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	return <SignIn ref={ref} {...rest} />;
});

SignInContainer.displayName = "SignIn";

export default SignIn;
