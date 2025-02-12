import { SignInProvider } from "@/contexts/signin/SignInProvider";
import SignInBase from "@/pages/signin/SignInBase";
import { Outlet } from "react-router-dom";

const SignInRoute = () => {


	return (
		<SignInBase>
			<SignInProvider>
				<Outlet />
			</SignInProvider>
		</SignInBase>
	);
};

export default SignInRoute;
