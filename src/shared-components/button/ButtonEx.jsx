import { memo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { forwardRef } from "react";

const ButtonEx = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<Button ref={ref} {...rest}>
				{children}
			</Button>
		);
	})
);

ButtonEx.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

ButtonEx.displayName = "ButtonEx";
export default ButtonEx;
