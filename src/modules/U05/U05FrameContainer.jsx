import { U05FormContainer } from "@/modules/U05/U05FormContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";

export const U05FrameContainer = () => {
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
			{/* <U05Toolbar /> */}
			{/* 表單 */}
			<U05FormContainer />
		</Box>
	);
};

U05FrameContainer.displayName = "U05Frame";



