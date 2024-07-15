import A19Toolbar from "@/components/jobs/A19/A19Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { A19FormContainer } from "@/components/jobs/A19/A19FormContainer";
import { OptionPickerProvider } from "../../shared-components/option-picker/OptionPickerProvider";

export const A19FrameContainer = () => {
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
			{/* <A19Toolbar /> */}
			{/* 表單 */}
			<OptionPickerProvider>
				<A19FormContainer />
			</OptionPickerProvider>
		</Box>
	);
};

A19FrameContainer.displayName = "A19Frame";
