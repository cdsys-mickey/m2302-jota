import { SignInProvider } from "@/contexts/signin/SignInProvider";
import SignInBase from "@/pages/signin/SignInBase";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SignInContext } from "../contexts/signin/SignInContext";
import Cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";

const PARAM_ACCOUNT = "ac";
const PARAM_PWROD = "pw";
const PARAM_CAPTCHA_PASSED = "captchaPassed";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_MODE = "md";
const COOKIE_REMEMBER_ME = "rememberMe";

const SignInRoute = () => {
	const forms = useForm({
		defaultValues: {
			[PARAM_ACCOUNT]: Cookies.get(COOKIE_ACCOUNT) || "",
			[PARAM_PWROD]: "",
			[PARAM_CAPTCHA_PASSED]: false,
			rememberMe:
				Cookies.get(COOKIE_REMEMBER_ME) !== undefined
					? Cookies.get(COOKIE_REMEMBER_ME) === "1"
					: true,
		},
	});

	return (
		<SignInProvider>
			<SignInBase>
				<FormProvider {...forms}>
					<Outlet />
				</FormProvider>
			</SignInBase>
		</SignInProvider>
	);
};

export default SignInRoute;
