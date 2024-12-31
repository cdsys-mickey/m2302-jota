import { D07DialogContainer } from "@/components/jobs/D07/dialog/D07DialogContainer";
import { D07ExpDialogContainer } from "@/components/jobs/D07/exp-dialog/D07ExpDialogContainer";
import { D07ListHeaderContainer } from "@/components/jobs/D07/list/D07ListHeaderContainer";
import D07ListToolbar from "@/components/jobs/D07/list/D07ListToolbar";
import { D07ListViewContainer } from "@/components/jobs/D07/list/D07ListViewContainer";
import { D07SearchFieldContainer } from "@/components/jobs/D07/search/D07SearchFieldContainer";
import D07SearchFormContainer from "@/components/jobs/D07/search/D07SearchFormContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const D07FrameContainer = () => {
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
					{/* <D07SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<D07SearchFormContainer />
					{/* 工具列 */}
					<D07ListToolbar />

					{/* 列表 */}
					<D07ListHeaderContainer />
					<D07ListViewContainer />

				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D07DialogContainer />
			<D07ExpDialogContainer />
		</Box>
	);
};

D07FrameContainer.displayName = "D07FrameContainer";
