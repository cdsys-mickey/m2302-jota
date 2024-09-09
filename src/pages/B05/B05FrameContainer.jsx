import { B05SearchFieldContainer } from "@/components/jobs/B05/B05SearchFieldContainer";
import { B05DialogContainer } from "@/components/jobs/B05/dialog/B05DialogContainer";
import B05ListHeader from "@/components/jobs/B05/list/B05ListHeader";
import B05ListToolbar from "@/components/jobs/B05/list/B05ListToolbar";
import { B05ListViewContainer } from "@/components/jobs/B05/list/B05ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B05Drawer from "../../components/jobs/B05/B05Drawer";

export const B05FrameContainer = () => {
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
					{<B05SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<B05ListToolbar />
				{/* 列表 */}
				<B05ListHeader />
				<B05ListViewContainer />
				{/* 對話框 */}
				<B05DialogContainer />

			</Box>
		</FormProvider>
	);
};

B05FrameContainer.displayName = "B05FrameContainer";
