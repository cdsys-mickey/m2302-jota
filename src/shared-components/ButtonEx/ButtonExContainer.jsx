import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ButtonExView from "./ButtonExView";

const ButtonExContainer = forwardRef((props, ref) => {
	const { size = "small", autoFocus = false, sx = [], ...rest } = props;

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
			console.log("autoFocus on " + ButtonExContainer.displayName);
			buttonRef.current.focus();
		}
	}, [autoFocus, buttonRefReady]);

	return (
		<ButtonExView
			ref={setButtonRef}
			size={size}
			{...rest}
			sx={[
				() => ({
					// 初始樣式
					'&:focus': {
						outline: '2px solid #b0b0b0',
						outlineOffset: '2px',
						animation: 'colorPulse 1.5s ease-in-out infinite',
					},
					// 動畫直接改變 border-color
					'@keyframes colorPulse': {
						'0%': { outlineColor: '#b0b0b0' },
						'50%': { outlineColor: '#ffffff' },
						'100%': { outlineColor: '#b0b0b0' },
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		/>
	);
});

ButtonExContainer.displayName = "ButtonExContainer";
ButtonExContainer.propTypes = {
	// responsive: PropTypes.bool,
	buttonComponent: PropTypes.element,
	autoFocus: PropTypes.bool,
	size: PropTypes.oneOf(["small", "medium", "large"]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ButtonExContainer;