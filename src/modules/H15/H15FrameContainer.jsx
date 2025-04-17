import { H15FormContainer } from "@/modules/H15/H15FormContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";

export const H15FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer></FrameBannerContainer>

			{/* 工具列 */}
			{/* <H15Toolbar /> */}
			{/* 表單 */}
			<H15FormContainer />
		</Box>
	);
};

H15FrameContainer.displayName = "H15Frame";






