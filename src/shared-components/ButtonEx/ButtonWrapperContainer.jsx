import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";
import ResponsiveLoadingButtonContainer from "./ResponsiveLoadingButtonContainer";

const ButtonWrapperContainer = forwardRef((props, ref) => {
	const { responsive, size = "small", autoFocus = false, ...rest } = props;

	const buttonRef = useRef();

	useImperativeHandle(ref, () => {
		return buttonRef.current;
	});

	useEffect(() => {
		if (buttonRef.current && autoFocus) {
			console.log("autoFocus on ButtonWrapperContainer");
			buttonRef.current?.focus();
		}
	}, [autoFocus]);

	if (responsive) {
		return (
			<ResponsiveLoadingButtonContainer ref={buttonRef} size={size} {...rest} />
		);
	}

	return <LoadingButton ref={buttonRef} size={size} {...rest} />;
});

ButtonWrapperContainer.displayName = "ButtonWrapperContainer";
ButtonWrapperContainer.propTypes = {
	responsive: PropTypes.bool,
	autoFocus: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default ButtonWrapperContainer;