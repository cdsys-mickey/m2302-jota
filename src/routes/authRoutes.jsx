import { Route } from "react-router-dom";
import SignInRoute from "./SignInRoute";
import { SignInContainer } from "@/pages/signin/SignInContainer";
import { SignInXContainer } from "@/pages/signin/SignInXContainer";

const authRoutes = (
	<>
		<Route path="auth" element={<SignInRoute />}>
			<Route index path="signin" element={<SignInContainer />} />
			<Route path="signinx" element={<SignInXContainer />} />
		</Route>
	</>
);

export default authRoutes;