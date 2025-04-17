import { C01DialogContainer } from "@/components/jobs/C01/dialog/C01DialogContainer";
import C01ListHeader from "@/components/jobs/C01/list/C01ListHeader";
import { C01ListViewContainer } from "@/components/jobs/C01/list/C01ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C01TransformToOrderDialogContainer from "../../../components/jobs/C01/dialog/transform-to-order/C01TransformToOrderDialogContainer";
import C01TransformToOrdersDialogContainer from "../../../components/jobs/C01/dialog/transform-to-order/C01TransformToOrdersDialogContainer";
import C01 from "../../../modules/C01.mjs";
import { C01SearchFormContainer } from "@/components/jobs/C01/list/C01SearchFormContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";

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
				<ResponsiveLayout>
					{/* 搜尋列 + 工具列 */}
					<C01SearchFormContainer />

					{/* 列表 */}
					<C01ListHeader />
					<C01ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<C01TransformToOrdersDialogContainer />
			<C01TransformToOrderDialogContainer />
			<C01DialogContainer />

		</Box>
	);
};

C01FrameContainer.displayName = "C01FrameContainer";
