import { F03DialogContainer } from "@/components/jobs/F03/dialog/F03DialogContainer";
import { F03ExpDialogContainer } from "@/components/jobs/F03/exp-dialog/F03ExpDialogContainer";
import { F03ListHeaderContainer } from "@/components/jobs/F03/list/F03ListHeaderContainer";
import F03ListToolbar from "@/components/jobs/F03/list/F03ListToolbar";
import { F03ListViewContainer } from "@/components/jobs/F03/list/F03ListViewContainer";
import { F03SearchFieldContainer } from "@/components/jobs/F03/search/F03SearchFieldContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const F03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					<F03SearchFieldContainer name="q" />
				</FrameBannerContainer>
				{/* 工具列 */}
				<F03ListToolbar />

				{/* 列表 */}
				<F03ListHeaderContainer />
				<F03ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<F03DialogContainer />
			<F03ExpDialogContainer />
		</Box>
	);
};

F03FrameContainer.displayName = "F03FrameContainer";

