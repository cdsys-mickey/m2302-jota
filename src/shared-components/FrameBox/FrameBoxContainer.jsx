import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import MuiStyles from "@/shared-modules/MuiStyles";
import { Box, useTheme } from "@mui/material"
import { useMemo } from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
// import BackgroundImage from "@/images/hex-bg-2.png";
// import BackgroundImage from "@/images/v748-toon-103-bright-20-1920.png";
// import BackgroundImage from "@/images/Hex-Gradient.png";
import BackgroundImage from "@/images/Hex-Gradient-OffWhite.png";

const FrameBoxContainer = (props) => {
	const { children, sx = [], backgroundImage = BackgroundImage, ...rest } = props;
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => MuiStyles.ofHomeBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return <Box sx={[
		boxStyles,
		(backgroundImage && {
			backgroundImage: `url(${backgroundImage})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			minHeight: "100vh",
		}),
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