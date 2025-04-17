import { B031DialogContainer } from "@/components/jobs/B031/dialog/B031DialogContainer";
import { B031ListFormContainer } from "@/components/jobs/B031/list/B031ListFormContainer";
import B031ListHeader from "@/components/jobs/B031/list/B031ListHeader";
import B031ListToolbar from "@/components/jobs/B031/list/B031ListToolbar";
import { B031ListViewContainer } from "@/components/jobs/B031/list/B031ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B031FrameContainer = () => {
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
					{/* {<B031SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B031ListFormContainer />
				{/* 工具列 */}
				<B031ListToolbar />
				{/* 列表 */}
				<B031ListHeader />
				<B031ListViewContainer />
				{/* 對話框 */}
				<B031DialogContainer />
			</Box>
		</FormProvider>
	);
};

B031FrameContainer.displayName = "B031FrameContainer";


