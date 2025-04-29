import { Popper } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { forwardRef, useEffect, useRef } from "react";

const OptionPickerPopper = forwardRef((props, ref) => {
	const { open } = props;
	const popperRef = useRef(null);

	console.log("rendering OptionPickerPopper", props);

	const setRef = useCallback((node) => {
		console.log("OptionPickerPopper.setRef invoked")
		popperRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				console.log("OptionPickerPopper 取得焦點")
				if (popperRef.current) {
					popperRef.current.focus();
				}
			}, 0);
		}
	}, [open]);

	return <Popper {...props} ref={setRef} />;
});

OptionPickerPopper.displayName = "OptionPickerPopper"
OptionPickerPopper.propTypes = {
	open: PropTypes.bool
}
export default OptionPickerPopper;