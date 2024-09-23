import { B012DialogContainer } from "@/components/jobs/B012/dialog/B012DialogContainer";
import { B012ListFormContainer } from "@/components/jobs/B012/list/B012ListFormContainer";
import B012ListHeader from "@/components/jobs/B012/list/B012ListHeader";
import B012ListToolbar from "@/components/jobs/B012/list/B012ListToolbar";
import { B012ListViewContainer } from "@/components/jobs/B012/list/B012ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B012FrameContainer = () => {
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
					{/* {<B012SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B012ListFormContainer />
				{/* 工具列 */}
				<B012ListToolbar />
				{/* 列表 */}
				<B012ListHeader />
				<B012ListViewContainer />
				{/* 對話框 */}
				<B012DialogContainer />
			</Box>
		</FormProvider>
	);
};

B012FrameContainer.displayName = "B012FrameContainer";

