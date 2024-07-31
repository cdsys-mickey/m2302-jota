import { CaptchaContext } from "./CaptchaContext";
import PropTypes from "prop-types";
import { useCaptcha } from "./useCaptcha";

export const CaptchaProvider = ({ children, ...opts }) => {
	const captcha = useCaptcha(opts);
	return (
		<CaptchaContext.Provider
			value={{
				...captcha,
			}}>
			{children}
		</CaptchaContext.Provider>
	);
};

CaptchaProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
