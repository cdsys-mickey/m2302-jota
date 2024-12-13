import { F01SearchFieldContainer } from "@/components/jobs/F01/F01SearchFieldContainer";
import { F01DialogContainer } from "@/components/jobs/F01/dialog/F01DialogContainer";
import F01ListHeader from "@/components/jobs/F01/list/F01ListHeader";
import F01ListToolbar from "@/components/jobs/F01/list/F01ListToolbar";
import { F01ListViewContainer } from "@/components/jobs/F01/list/F01ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import F01Drawer from "../../../components/jobs/F01/F01Drawer";

export const F01FrameContainer = () => {
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
					{<F01SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<F01ListToolbar />
				{/* 列表 */}
				<F01ListHeader />
				<F01ListViewContainer />
				{/* 對話框 */}
				<F01DialogContainer />

			</Box>
		</FormProvider>
	);
};

F01FrameContainer.displayName = "F01FrameContainer";

