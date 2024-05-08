import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C03ListToolbar from "@/components/modules/C03/list/C03ListToolbar";
import { C03DialogContainer } from "@/components/modules/C03/dialog/C03DialogContainer";
import C03ListHeader from "@/components/modules/C03/list/C03ListHeader";
import { C03ListViewContainer } from "@/components/modules/C03/list/C03ListViewContainer";
import { C03SearchFieldContainer } from "@/components/modules/C03/C03SearchFieldContainer";
import Styles from "@/modules/md-styles";
import C03 from "@/modules/md-c03";

export const C03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm({
		defaultValues: {
			listMode: C03.getOptionById(C03.ListModes.NOT_REVIEWED),
		},
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
					{<C03SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<C03ListToolbar />

				{/* 列表 */}
				<C03ListHeader />
				<C03ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<C03DialogContainer />
		</Box>
	);
};

C03FrameContainer.displayName = "C03FrameContainer";
