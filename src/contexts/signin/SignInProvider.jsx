import Auth from "@/modules/md-auth";
import { useInit } from "@/shared-hooks/useInit";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { SignInContext } from "./SignInContext";
import { useSignIn } from "./useSignIn";

export const SignInProvider = ({ children }) => {
	const signin = useSignIn();

	const form = useForm({
		defaultValues: {
			ac: Cookies.get(Auth.COOKIE_ACCOUNT) || "",
			pw: "",
			captcha: "",
			captchaPassed: false,
			rememberMe: false,
		},
	});

	const { reset } = form;

	useInit(() => {
		reset({
			ac: Cookies.get(Auth.COOKIE_REMEMBER_ME) === "1" ? Cookies.get(Auth.COOKIE_ACCOUNT) || "" : "",
			pw: "",
			captcha: "",
			captchaPassed: false,
			rememberMe: Cookies.get(Auth.COOKIE_REMEMBER_ME) !== undefined
				? Cookies.get(Auth.COOKIE_REMEMBER_ME) === "1"
				: true,
		})
	}, [])

	return (
		<SignInContext.Provider
			value={{
				...signin,
			}}>
			<FormProvider {...form}>
				{children}
			</FormProvider>
		</SignInContext.Provider>
	);
};

SignInProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
