import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import MuiStyles from "@/shared-modules/MuiStyles";
import { Box, useTheme } from "@mui/material"
import { useMemo } from "react";
import { useContext } from "react";
import PropTypes from "prop-types";

const FrameBoxContainer = (props) => {
	const { children, sx = [], ...rest } = props;
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => MuiStyles.ofHomeBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return <Box sx={[
		boxStyles,
		...(Array.isArray(sx) ? sx : [sx]),
	]} {...rest}>
		{children}
	</Box>
}

FrameBoxContainer.displayName = "FrameBoxContainer";
FrameBoxContainer.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}
export default FrameBoxContainer;