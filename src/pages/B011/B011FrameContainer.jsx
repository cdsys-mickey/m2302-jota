import { B011DialogContainer } from "@/components/jobs/B011/dialog/B011DialogContainer";
import { B011ListFormContainer } from "@/components/jobs/B011/list/B011ListFormContainer";
import B011ListHeader from "@/components/jobs/B011/list/B011ListHeader";
import B011ListToolbar from "@/components/jobs/B011/list/B011ListToolbar";
import { B011ListViewContainer } from "@/components/jobs/B011/list/B011ListViewContainer";
import B011PrintDialogContainer from "@/components/jobs/B011/print/B011PrintDialogContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B011FrameContainer = () => {
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
					{/* {<B011SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B011ListFormContainer />
				{/* 工具列 */}
				<B011ListToolbar />
				{/* 列表 */}
				<B011ListHeader />
				<B011ListViewContainer />
				{/* 對話框 */}
				<B011DialogContainer />
				<B011PrintDialogContainer />
			</Box>
		</FormProvider>
	);
};

B011FrameContainer.displayName = "B011FrameContainer";

