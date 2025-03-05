import { U06_1FormContainer } from "@/modules/U06_1/U06_1FormContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";

export const U061FrameContainer = () => {
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
			{/* <U061Toolbar /> */}
			{/* 表單 */}
			<U06_1FormContainer />
		</Box>
	);
};

U061FrameContainer.displayName = "U061Frame";



