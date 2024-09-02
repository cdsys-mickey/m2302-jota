import { C01SearchFieldContainer } from "@/components/jobs/C01/C01SearchFieldContainer";
import { C01DialogContainer } from "@/components/jobs/C01/dialog/C01DialogContainer";
import C01ListHeader from "@/components/jobs/C01/list/C01ListHeader";
import C01ListToolbar from "@/components/jobs/C01/list/C01ListToolbar";
import { C01ListViewContainer } from "@/components/jobs/C01/list/C01ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C01TransformToOrderDialogContainer from "../../components/jobs/C01/dialog/transform-to-order/C01TransformToOrderDialogContainer";
import C01TransformToOrdersDialogContainer from "../../components/jobs/C01/dialog/transform-to-order/C01TransformToOrdersDialogContainer";
import C01 from "../../modules/md-c01";
import { OptionPickerProvider } from "../../shared-components/option-picker/OptionPickerProvider";
import { C01ListFormContainer } from "@/components/jobs/C01/list/C01ListFormContainer";
import C01Drawer from "@/components/jobs/C01/C01Drawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

export const C01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const form = useForm({
		defaultValues: {
			listMode: C01.getOptionById(C01.ListModes.NOT_ORDERED_INCLUDED),
		},
	});

	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...form}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* <C01SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>
				{/* 搜尋列 */}
				<C01ListFormContainer />
				{/* 工具列 */}
				<C01ListToolbar />

				{/* 列表 */}
				<C01ListHeader />
				<C01ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<C01TransformToOrdersDialogContainer />
			<C01TransformToOrderDialogContainer />
			<OptionPickerProvider>
				<C01DialogContainer />
			</OptionPickerProvider>
			<C01Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
		</Box>
	);
};

C01FrameContainer.displayName = "C01FrameContainer";
