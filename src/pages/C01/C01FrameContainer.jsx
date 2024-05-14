import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C01ListToolbar from "@/components/modules/C01/list/C01ListToolbar";
import { C01DialogContainer } from "@/components/modules/C01/dialog/C01DialogContainer";
import C01ListHeader from "@/components/modules/C01/list/C01ListHeader";
import { C01ListViewContainer } from "@/components/modules/C01/list/C01ListViewContainer";
import { C01SearchFieldContainer } from "@/components/modules/C01/C01SearchFieldContainer";
import Styles from "@/modules/md-styles";
import C01 from "../../modules/md-c01";
import { useInit } from "../../shared-hooks/useInit";
import { OptionPickerProvider } from "../../shared-components/picker/listbox/OptionPickerProvider";
import C01TransformToOrderDialogContainer from "../../components/modules/C01/dialog/transform-to-order/C01TransformToOrderDialogContainer";

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
					{<C01SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<C01ListToolbar />

				{/* 列表 */}
				<C01ListHeader />
				<C01ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<C01TransformToOrderDialogContainer />
			<OptionPickerProvider>
				<C01DialogContainer />
			</OptionPickerProvider>
		</Box>
	);
};

C01FrameContainer.displayName = "C01FrameContainer";
