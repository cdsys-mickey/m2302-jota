import { B04SearchFieldContainer } from "@/components/jobs/B04/B04SearchFieldContainer";
import { B04DialogContainer } from "@/components/jobs/B04/dialog/B04DialogContainer";
import { B04ListFormContainer } from "@/components/jobs/B04/list/B04ListFormContainer";
import B04ListHeader from "@/components/jobs/B04/list/B04ListHeader";
import B04ListToolbar from "@/components/jobs/B04/list/B04ListToolbar";
import { B04ListViewContainer } from "@/components/jobs/B04/list/B04ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B04FrameContainer = () => {
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
					{/* {<B04SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B04ListFormContainer />
				{/* 工具列 */}
				<B04ListToolbar />
				{/* 列表 */}
				<B04ListHeader />
				<B04ListViewContainer />
				{/* 對話框 */}
				<B04DialogContainer />
			</Box>
		</FormProvider>
	);
};

B04FrameContainer.displayName = "B04FrameContainer";



