import { D06SearchFieldContainer } from "@/components/jobs/D06/search/D06SearchFieldContainer";
import { D06DialogContainer } from "@/components/jobs/D06/dialog/D06DialogContainer";
import D06ListToolbar from "@/components/jobs/D06/list/D06ListToolbar";
import { D06ListViewContainer } from "@/components/jobs/D06/list/D06ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D06ExpDialogContainer } from "@/components/jobs/D06/exp-dialog/D06ExpDialogContainer";
import { D06ListHeaderContainer } from "@/components/jobs/D06/list/D06ListHeaderContainer";
import { D06Context } from "../../../contexts/D06/D06Context";
import { useInit } from "../../../shared-hooks/useInit";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import D06SearchFormContainer from "@/components/jobs/D06/search/D06SearchFormContainer";

export const D06FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	// const d06 = useContext(D06Context);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useInit(() => {
	// 	d06.loadStockPword();
	// }, []);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* <D06SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<D06SearchFormContainer initSize="md" />
					{/* 工具列 */}
					<D06ListToolbar />

					{/* 列表 */}
					<D06ListHeaderContainer />
					<D06ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D06DialogContainer />
			<D06ExpDialogContainer />
		</Box>
	);
};

D06FrameContainer.displayName = "D06FrameContainer";
