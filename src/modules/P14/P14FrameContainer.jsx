import { P14SearchFieldContainer } from "@/modules/P14/P14SearchFieldContainer";
import { P14DialogContainer } from "@/modules/P14/dialog/P14DialogContainer";
import P14ListHeader from "@/modules/P14/list/P14ListHeader";
import P14ListToolbar from "@/modules/P14/list/P14ListToolbar";
import { P14ListViewContainer } from "@/modules/P14/list/P14ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
export const P14FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				{/* 標題 */}
				<FrameBannerContainer>
					{<P14SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<P14ListToolbar />
				{/* 列表 */}
				<P14ListHeader />
				<P14ListViewContainer />
				{/* 對話框 */}
				<P14DialogContainer />

			</Box>
		</FormProvider>
	);
};

P14FrameContainer.displayName = "P14FrameContainer";


