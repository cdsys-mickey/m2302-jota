import { Box, Paper } from "@mui/material";
import React from "react";
import { memo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const PopperBox = memo(
	forwardRef((props, ref) => {
		const { children, width, ...rest } = props;
		return (
			<Box ref={ref} sx={{ marginTop: "2px" }}>
				<Paper
					elevation={8}
					component={Box}
					sx={{
						width: width,
						// bgcolor: "rgb(255 255 255 / 70%)",
						// backdropFilter: "blur(5px)",
					}}
					p={0}
					{...rest}>
					{children}
				</Paper>
			</Box>
		);
	})
);
PopperBox.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
PopperBox.displayName = "PopperBox";
export default PopperBox;
