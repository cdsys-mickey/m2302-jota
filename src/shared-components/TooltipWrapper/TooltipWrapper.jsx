import { cloneElement } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

const TooltipWrapper = (props) => {
	const { children, title, ...rest } = props;
	if (!title) {
		return cloneElement(children, rest);
	}

	return (
		<Tooltip title={title} {...rest}>
			{children}
		</Tooltip>
	)
}
TooltipWrapper.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}
TooltipWrapper.displayName = "TooltipWrapper";
export default TooltipWrapper;