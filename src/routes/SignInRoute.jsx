import { SignInProvider } from "@/contexts/signin/SignInProvider";
import SignInBase from "@/pages/signin/SignInBase";
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
