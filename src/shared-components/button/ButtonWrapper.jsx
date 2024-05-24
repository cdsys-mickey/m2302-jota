import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import ResponsiveLoadingButton from "./ResponsiveLoadingButton";

export const ButtonWrapper = forwardRef((props, ref) => {
	const { responsive, size = "small", ...rest } = props;

	if (responsive) {
		return <ResponsiveLoadingButton ref={ref} size={size} {...rest} />;
	}

	return <LoadingButton ref={ref} size={size} {...rest} />;
});

ButtonWrapper.displayName = "ButtonWrapper";
ButtonWrapper.propTypes = {
	responsive: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
};
