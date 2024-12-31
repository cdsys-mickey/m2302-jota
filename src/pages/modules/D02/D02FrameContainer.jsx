import { D02SearchFieldContainer } from "@/components/jobs/D02/search/D02SearchFieldContainer";
import { D02DialogContainer } from "@/components/jobs/D02/dialog/D02DialogContainer";
import D02ListToolbar from "@/components/jobs/D02/list/D02ListToolbar";
import { D02ListViewContainer } from "@/components/jobs/D02/list/D02ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D02ExpDialogContainer } from "@/components/jobs/D02/exp-dialog/D02ExpDialogContainer";
import { D02ListHeaderContainer } from "@/components/jobs/D02/list/D02ListHeaderContainer";
import { D02Context } from "../../../contexts/D02/D02Context";
import { useInit } from "../../../shared-hooks/useInit";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import D02SearchFormContainer from "@/components/jobs/D02/search/D02SearchFormContainer";

export const D02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	// const d02 = useContext(D02Context);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useInit(() => {
	// 	d02.loadStockPword();
	// }, []);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* <D02SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>

				<ResponsiveLayout>
					<D02SearchFormContainer />
					{/* 工具列 */}
					<D02ListToolbar />

					{/* 列表 */}
					<D02ListHeaderContainer />
					<D02ListViewContainer />

				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D02DialogContainer />
			<D02ExpDialogContainer />
		</Box>
	);
};

D02FrameContainer.displayName = "D02FrameContainer";
