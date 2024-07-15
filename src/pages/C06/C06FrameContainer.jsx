import { C06SearchFieldContainer } from "@/components/jobs/C06/search/C06SearchFieldContainer";
import { C06DialogContainer } from "@/components/jobs/C06/dialog/C06DialogContainer";
import C06ListHeader from "@/components/jobs/C06/list/C06ListHeader";
import C06ListToolbar from "@/components/jobs/C06/list/C06ListToolbar";
import { C06ListViewContainer } from "@/components/jobs/C06/list/C06ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C06FrameContainer = () => {
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
				<FrameBannerContainer>
					{<C06SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* <C06FormContainer /> */}
				<C06ListToolbar />
				<C06ListHeader />
				<C06ListViewContainer />
			</FormProvider>
			<C06DialogContainer />
		</Box>
	);
};

C06FrameContainer.displayName = "C06FrameContainer";
