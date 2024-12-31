import { D041SearchFieldContainer } from "@/components/jobs/D041/search/D041SearchFieldContainer";
import { D041DialogContainer } from "@/components/jobs/D041/dialog/D041DialogContainer";
import D041ListToolbar from "@/components/jobs/D041/list/D041ListToolbar";
import { D041ListViewContainer } from "@/components/jobs/D041/list/D041ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D041ExpDialogContainer } from "@/components/jobs/D041/exp-dialog/D041ExpDialogContainer";
import { D041ListHeaderContainer } from "@/components/jobs/D041/list/D041ListHeaderContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import D041SearchFormContainer from "@/components/jobs/D041/search/D041SearchFormContainer";
// import { D041Context } from "../../contexts/D041/D041Context";
// import { useInit } from "../../shared-hooks/useInit";

export const D041FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	// const d041 = useContext(D041Context);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useInit(() => {
	// 	d041.loadStockPword();
	// }, []);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* <D041SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<D041SearchFormContainer initSize="md" />
					{/* 工具列 */}
					<D041ListToolbar />

					{/* 列表 */}
					<D041ListHeaderContainer />
					<D041ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D041DialogContainer />
			<D041ExpDialogContainer />
		</Box>
	);
};

D041FrameContainer.displayName = "D041FrameContainer";
