import { TooltipEx } from "@/shared-components";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const TooltipWrapper = (props) => {
	const { children, title, disabled, ...rest } = props;
	if (!title) {
		return cloneElement(children, rest);
	}

	return (
		<TooltipEx title={title} {...rest}>
			{
				disabled
					? (
						<span>
							{children}
						</span>
					)
					: children
			}
		</TooltipEx>
	)
}
TooltipWrapper.propTypes = {
	disabled: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}
TooltipWrapper.displayName = "TooltipWrapper";
export default TooltipWrapper;