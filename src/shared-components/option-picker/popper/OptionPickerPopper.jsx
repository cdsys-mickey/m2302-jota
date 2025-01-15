import { Popper } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef } from "react";

const OptionPickerPopper = forwardRef((props, ref) => {
	const { open } = props;
	const popperRef = useRef(null);

	useEffect(() => {
		if (open && popperRef.current) {
			popperRef.current.focus(); // 讓 Popper 取得焦點
		}
	}, [open]);

	return <Popper {...props} ref={(node) => {
		popperRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}} />;
});

OptionPickerPopper.displayName = "OptionPickerPopper"
OptionPickerPopper.propTypes = {
	open: PropTypes.bool
}
export default OptionPickerPopper;