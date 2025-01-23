import { Popper } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { forwardRef, useEffect, useRef } from "react";

const OptionPickerPopper = forwardRef((props, ref) => {
	const { open } = props;
	const popperRef = useRef(null);

	const setRef = useCallback((node) => {
		console.log("setRef invoked")
		popperRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);

	useEffect(() => {
		if (open && popperRef.current) {
			console.log("OptionPickerPopper 取得焦點")
			popperRef.current.focus();
		}
	}, [open]);

	return <Popper {...props} ref={setRef} />;
});

OptionPickerPopper.displayName = "OptionPickerPopper"
OptionPickerPopper.propTypes = {
	open: PropTypes.bool
}
export default OptionPickerPopper;