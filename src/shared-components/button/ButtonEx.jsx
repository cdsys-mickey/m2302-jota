import { memo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { forwardRef } from "react";

const ButtonEx = memo(
	forwardRef((props, ref) => {
		const { children, size = "small", ...rest } = props;
		return (
			<Button ref={ref} size={size} {...rest}>
				{children}
			</Button>
		);
	})
);

ButtonEx.propTypes = {
	size: PropTypes.oneOf(["small", "medium", "large"]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

ButtonEx.displayName = "ButtonEx";
export default ButtonEx;
