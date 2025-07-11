import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";
import ResponsiveLoadingButtonContainer from "./ResponsiveLoadingButtonContainer";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Colors from "@/modules/Colors.mjs";

const ButtonWrapperContainer = forwardRef((props, ref) => {
	const { responsive, size = "small", autoFocus = false, sx = [], ...rest } = props;

	const buttonRef = useRef();
	const [buttonRefReady, setButtonReady] = useState(false);
	const setButtonRef = useCallback((node) => {
		buttonRef.current = node;
		setButtonReady(!!node);
	}, []);

	useImperativeHandle(ref, () => {
		return buttonRef.current;
	});

	useEffect(() => {
		if (buttonRefReady && autoFocus) {
			console.log("autoFocus on ButtonWrapperContainer");
			buttonRef.current.focus();
		}
	}, [autoFocus, buttonRefReady]);

	const ButtonComponent = useMemo(() => {
		return responsive ? ResponsiveLoadingButtonContainer : LoadingButton;
	}, [responsive])

	return (
		<ButtonComponent
			ref={setButtonRef}
			size={size} {...rest}
			sx={[
				() => ({
					// '--wrapper-color': '#b0b0b0', // 定義 CSS 變數
					'--wrapper-color': Colors.FOCUSED_BORDER, // 定義 CSS 變數
					'&:focus': {
						outline: '2px solid var(--wrapper-color)',
						outlineOffset: '2px',
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		/>
	)
});

ButtonWrapperContainer.displayName = "ButtonWrapperContainer";
ButtonWrapperContainer.propTypes = {
	responsive: PropTypes.bool,
	autoFocus: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default ButtonWrapperContainer;