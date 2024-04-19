import { LoadingButton } from "@mui/lab";
import ButtonEx from "./ButtonEx";
import ResponsiveLoadingButton from "./ResponsiveLoadingButton";
import PropTypes from "prop-types";

export const ButtonWrapper = (props) => {
	const { responsive, size = "small", ...rest } = props;

	if (responsive) {
		return <ResponsiveLoadingButton size={size} {...rest} />;
	}

	return <LoadingButton size={size} {...rest} />;
};

ButtonWrapper.displayName = "ButtonWrapper";
ButtonWrapper.propTypes = {
	responsive: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
};
