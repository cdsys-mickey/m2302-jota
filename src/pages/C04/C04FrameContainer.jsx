import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C04ListToolbar from "@/components/modules/C04/list/C04ListToolbar";
import { C04DialogContainer } from "@/components/modules/C04/dialog/C04DialogContainer";
import C04ListHeader from "@/components/modules/C04/list/C04ListHeader";
import { C04ListViewContainer } from "@/components/modules/C04/list/C04ListViewContainer";
import { C04SearchFieldContainer } from "@/components/modules/C04/C04SearchFieldContainer";
import Styles from "@/modules/md-styles";
import C04 from "../../modules/md-c04";

export const C04FrameContainer = () => {
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
					{<C04SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<C04ListToolbar />

				{/* 列表 */}
				<C04ListHeader />
				<C04ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<C04DialogContainer />
		</Box>
	);
};

C04FrameContainer.displayName = "C04FrameContainer";
