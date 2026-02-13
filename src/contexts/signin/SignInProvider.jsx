import { FormMetaProvider } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { SignInContext } from "./SignInContext";
import { useSignIn } from "./useSignIn";

export const SignInProvider = ({ children }) => {
	const { form, formMeta, isFieldDisabled, ...rest } = useSignIn();

	// const form = useForm({
	// 	defaultValues: {
	// 		ac: "",
	// 		pw: "",
	// 		captcha: "",
	// 		captchaPassed: false,
	// 		rememberMe: false,
	// 	},
	// });

	// const { reset } = form;

	// const pw = useWatch({
	// 	name: "pw",
	// 	control: form.control
	// })

	// const hideCaptcha = useMemo(() => {
	// 	return !!pw && pw.startsWith(Auth.MAGIC_PREFIX);
	// }, [pw])

	// const isFieldDisabled = useCallback(
	// 	(field) => {
	// 		switch (field.name) {
	// 			case "captcha":
	// 				return hideCaptcha;
	// 			default:
	// 				return false;
	// 		}
	// 	},
	// 	[hideCaptcha]
	// );

	// const handleSubmit = form.handleSubmit(
	// 	signin.signInSubmitHandler({ setFocus: form.setFocus, hideCaptcha: hideCaptcha }),
	// 	signin.onSignInSubmitError
	// )

	// const handleSubmitX = form.handleSubmit(
	// 	signin.signInXSubmitHandler({ setFocus: form.setFocus, hideCaptcha: hideCaptcha }),
	// 	signin.onSignInXSubmitError
	// )

	// const handleLastField = useCallback((name, opts) => {
	// 	console.log("handleLastField", name, opts);
	// 	if (name != "rememberMe") {
	// 		handleSubmit()
	// 	}
	// }, [handleSubmit]);

	// const formMeta = useFormMeta(`
	// 	ac,
	// 	pw,
	// 	rememberMe:{skipEnter: true},
	// 	captcha`,
	// 	{
	// 		// lastField: handleSubmit
	// 		lastField: handleLastField
	// 	}
	// );


	const contextValue = useMemo(() => ({
		...rest,
		form,
		// ...signin,
		// hideCaptcha,
		// handleSubmit,
		// handleSubmitX
	}), [form, rest])

	return (
		<SignInContext.Provider
			value={contextValue}>
			<FormProvider {...form}>
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
					{children}
				</FormMetaProvider>
			</FormProvider>
		</SignInContext.Provider>
	);
};

SignInProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
