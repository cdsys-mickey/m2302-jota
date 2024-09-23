import { B032DialogContainer } from "@/components/jobs/B032/dialog/B032DialogContainer";
import { B032ListFormContainer } from "@/components/jobs/B032/list/B032ListFormContainer";
import B032ListHeader from "@/components/jobs/B032/list/B032ListHeader";
import B032ListToolbar from "@/components/jobs/B032/list/B032ListToolbar";
import { B032ListViewContainer } from "@/components/jobs/B032/list/B032ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const B032FrameContainer = () => {
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
					{/* {<B032SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<B032ListFormContainer />
				{/* 工具列 */}
				<B032ListToolbar />
				{/* 列表 */}
				<B032ListHeader />
				<B032ListViewContainer />
				{/* 對話框 */}
				<B032DialogContainer />
			</Box>
		</FormProvider>
	);
};

B032FrameContainer.displayName = "B032FrameContainer";


