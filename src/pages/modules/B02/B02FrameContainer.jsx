import { B02SearchFieldContainer } from "@/components/jobs/B02/B02SearchFieldContainer";
import { B02DialogContainer } from "@/components/jobs/B02/dialog/B02DialogContainer";
import { B02ListFormContainer } from "@/components/jobs/B02/list/B02ListFormContainer";
import B02ListHeader from "@/components/jobs/B02/list/B02ListHeader";
import B02ListToolbar from "@/components/jobs/B02/list/B02ListToolbar";
import B02ListToolbarContainer from "@/components/jobs/B02/list/B02ListToolbarContainer";
import { B02ListViewContainer } from "@/components/jobs/B02/list/B02ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B02FrameContainer = () => {
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
					{/* {<B02SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B02ListFormContainer />
				{/* 工具列 */}
				<B02ListToolbarContainer />
				{/* 列表 */}
				<B02ListHeader />
				<B02ListViewContainer />
				{/* 對話框 */}
				<B02DialogContainer />
			</Box>
		</FormProvider>
	);
};

B02FrameContainer.displayName = "B02FrameContainer";


