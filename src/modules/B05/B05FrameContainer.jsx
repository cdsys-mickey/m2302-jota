import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B05DialogContainer } from "./dialog/B05DialogContainer";
import B05SearchFormContainer from "./search/B05SearchFormContainer";
import B05ListToolbar from "./list/B05ListToolbar";
import B05ListHeader from "./list/B05ListHeader";
import { B05ListViewContainer } from "./list/B05ListViewContainer";

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
					{/* {<B05SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				<B05SearchFormContainer />
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
