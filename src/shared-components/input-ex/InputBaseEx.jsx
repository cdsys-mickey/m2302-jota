/* eslint-disable no-mixed-spaces-and-tabs */
import { InputBase } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const InputBaseEx = memo(
	forwardRef((props, ref) => {
		const { value, onChange, ...rest } = props;
		return (
			<InputBase ref={ref} value={value} onChange={onChange} {...rest} />
		);
	})
);

InputBaseEx.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};

InputBaseEx.displayName = "InputBaseEx";
export default InputBaseEx;
