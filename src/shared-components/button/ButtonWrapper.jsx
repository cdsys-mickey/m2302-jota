import ButtonEx from "./ButtonEx";
import ResponsiveLoadingButton from "./ResponsiveLoadingButton";
import PropTypes from "prop-types";

export const ButtonWrapper = (props) => {
	const { responsive, ...rest } = props;

	if (responsive) {
		return <ResponsiveLoadingButton {...rest} />;
	}

	return <ButtonEx {...rest} />;
};

ButtonWrapper.displayName = "ButtonWrapper";
ButtonWrapper.propTypes = {
	responsive: PropTypes.bool,
};
