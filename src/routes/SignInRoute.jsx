import { SignInProvider } from "@/contexts/SignInContext";
import SignInBase from "@/pages/auth/SignInBase";
import { Outlet } from "react-router-dom";

const SignInRoute = () => {
	return (
		<SignInProvider>
			<SignInBase>
				<Outlet />
			</SignInBase>
		</SignInProvider>
	);
};

export default SignInRoute;
