import { Box, Grid } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";

const OptionPickerGridHeader = memo((props) => {
	const { children, slotProps, bgColor = grey[400], color, ...rest } = props;

	return (
		<Box
			sx={[
				(theme) => ({
					borderBottom: "1px solid rgb(0,0,0,0.1)",
					position: "relative",
					backgroundColor: bgColor,
					color: color ?? theme.palette.getContrastText(bgColor)
				})]}
			{...slotProps?.wrapper}
		>
			<Box px={2}>
				<Grid container columns={24} spacing={0} {...rest}>
					{children}
				</Grid>
			</Box>
		</Box>
	);
})

OptionPickerGridHeader.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	color: PropTypes.string,
	bgColor: PropTypes.string,
	slotProps: PropTypes.object
}

OptionPickerGridHeader.displayName = "OptionPickerGridHeader";
export default OptionPickerGridHeader;