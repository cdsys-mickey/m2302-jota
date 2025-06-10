import { memo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { forwardRef } from "react";

const ButtonExView = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<Button ref={ref} {...rest}>
				{children}
			</Button>
		);
	})
);

ButtonExView.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

ButtonExView.displayName = "ButtonEx";
export default ButtonExView;
