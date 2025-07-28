import { Box } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";

const ToolbarDividerViewComponent = (props) => {
	const { height = "24px", width = "1px", backgroundColor = "rgba(0, 0, 0, 0.12)", ...rest } = props;
	return (
		<Box
			sx={{
				width,
				height,
				backgroundColor,
				// mx: 1, // 水平間距（margin）
			}}
			{...rest}
		/>
	);
}

ToolbarDividerViewComponent.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	backgroundColor: PropTypes.string
}
const ToolbarDividerView = memo(ToolbarDividerViewComponent);
export default ToolbarDividerView;