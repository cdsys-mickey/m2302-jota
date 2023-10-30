import { Box } from "@mui/system";
import React from "react";
import { forwardRef } from "react";
import { memo } from "react";
import PropTypes from "prop-types";

const ZZAppFrame = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;

		// const location = useLocation();

		return (
			<Box ref={ref} sx={{ display: "flex", width: "100%" }} {...rest}>
				<Box sx={{ flexGrow: 1, height: "100vh" }}>{children}</Box>
			</Box>
		);
	})
);

ZZAppFrame.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default ZZAppFrame;
