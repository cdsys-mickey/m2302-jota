import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import ResponsiveLoadingButton from "./ResponsiveLoadingButton";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";

export const ButtonWrapper = forwardRef((props, ref) => {
	const { responsive, size = "small", autoFocus = false, ...rest } = props;

	const buttonRef = useRef();

	// useImperativeHandle(ref, () => ({
	// 	focus: () => {
	// 		buttonRef.current?.focus();
	// 	},
	// }));
	useImperativeHandle(ref, () => {
		return buttonRef.current;
	});

	useEffect(() => {
		if (buttonRef.current && autoFocus) {
			console.log("autoFocus on ButtonWrapper");
			buttonRef.current?.focus();
		}
	}, [autoFocus]);

	if (responsive) {
		return (
			<ResponsiveLoadingButton ref={buttonRef} size={size} {...rest} />
		);
	}

	return <LoadingButton ref={buttonRef} size={size} {...rest} />;
});

ButtonWrapper.displayName = "ButtonWrapper";
ButtonWrapper.propTypes = {
	responsive: PropTypes.bool,
	autoFocus: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
};
