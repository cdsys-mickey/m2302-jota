import { useContext } from "react";
import { ControlledCaptchaField } from "@/shared-components/captcha-field/ControlledCaptchaField";
import { SignInContext } from "../../contexts/signin/SignInContext";

export const CaptchaFieldContainer = (props) => {
	const { ...rest } = props;
	const signin = useContext(SignInContext);
	return <ControlledCaptchaField {...signin.captcha} {...rest} />;
};

CaptchaFieldContainer.displayName = "CaptchaFieldContainer";
