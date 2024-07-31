import { SignInProvider } from "@/contexts/signin/SignInProvider";
import SignInBase from "@/pages/signin/SignInBase";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

const COOKIE_ACCOUNT = "ac";
const COOKIE_REMEMBER_ME = "rememberMe";

const SignInRoute = () => {
	const rememberMe = useMemo(() => {
		return Cookies.get(COOKIE_REMEMBER_ME) !== undefined
			? Cookies.get(COOKIE_REMEMBER_ME) === "1"
			: true;
	}, []);

	const form = useForm({
		defaultValues: {
			ac: Cookies.get(COOKIE_ACCOUNT) || "",
			pw: "",
			captcha: "",
			captchaPassed: false,
			rememberMe: rememberMe,
		},
	});

	return (
		<SignInProvider>
			<SignInBase>
				<FormProvider {...form}>
					<Outlet />
				</FormProvider>
			</SignInBase>
		</SignInProvider>
	);
};

export default SignInRoute;
