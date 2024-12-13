import B06Toolbar from "@/components/jobs/B06/B06Toolbar";
import B06ListHeader from "@/components/jobs/B06/list/B06ListHeader";
import { B06ListViewContainer } from "@/components/jobs/B06/list/B06ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B06FormContainer } from "../../../components/jobs/B06/form/B06FormContainer";
import { B06ToolbarContainer } from "../../../components/jobs/B06/B06ToolbarContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

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
				<B06FormContainer />
				<B06ToolbarContainer />
				<B06ListHeader />
				<B06ListViewContainer />
			</Box>
		</FormProvider>
	);
};

B06FrameContainer.displayName = "B06FrameContainer";
