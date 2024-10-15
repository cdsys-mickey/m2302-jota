import { D01SearchFieldContainer } from "@/components/jobs/D01/search/D01SearchFieldContainer";
import { D01DialogContainer } from "@/components/jobs/D01/dialog/D01DialogContainer";
import D01ListToolbar from "@/components/jobs/D01/list/D01ListToolbar";
import { D01ListViewContainer } from "@/components/jobs/D01/list/D01ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D01ExpDialogContainer } from "@/components/jobs/D01/exp-dialog/D01ExpDialogContainer";
import { D01ListHeaderContainer } from "@/components/jobs/D01/list/D01ListHeaderContainer";
import { D01Context } from "../../contexts/D01/D01Context";
import { useInit } from "../../shared-hooks/useInit";

export const D01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const d01 = useContext(D01Context);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useInit(() => {
	// 	d01.loadStockPword();
	// }, []);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					<D01SearchFieldContainer name="q" />
				</FrameBannerContainer>
				{/* 工具列 */}
				<D01ListToolbar />

				{/* 列表 */}
				<D01ListHeaderContainer />
				<D01ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<D01DialogContainer />
			<D01ExpDialogContainer />

		</Box>
	);
};

D01FrameContainer.displayName = "D01FrameContainer";
