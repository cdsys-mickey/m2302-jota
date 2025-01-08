import { B05DialogContainer } from "@/components/jobs/B05/dialog/B05DialogContainer";
import B06ListHeader from "@/components/jobs/B06/list/B06ListHeader";
import { B06ListViewContainer } from "@/components/jobs/B06/list/B06ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B06ToolbarContainer } from "@/components/jobs/B06/B06ToolbarContainer";
import { B06SearchFormContainer } from "@/components/jobs/B06/form/B06SearchFormContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";

export const B06FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				<FrameBannerContainer></FrameBannerContainer>
				<ResponsiveLayout>
					<B06SearchFormContainer />
					<B06ToolbarContainer />
					<B06ListHeader />
					<B06ListViewContainer />
				</ResponsiveLayout>
				{/* B05 對話框 */}
				<B05DialogContainer />
			</Box>
		</FormProvider>
	);
};

B06FrameContainer.displayName = "B06FrameContainer";
