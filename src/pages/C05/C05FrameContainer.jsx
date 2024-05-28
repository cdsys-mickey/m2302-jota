import { C05SearchFieldContainer } from "@/components/modules/C05/search/C05SearchFieldContainer";
import { C05DialogContainer } from "@/components/modules/C05/dialog/C05DialogContainer";
import C05ListHeader from "@/components/modules/C05/list/C05ListHeader";
import C05ListToolbar from "@/components/modules/C05/list/C05ListToolbar";
import { C05ListViewContainer } from "@/components/modules/C05/list/C05ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C05FrameContainer = () => {
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
					{<C05SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* <C05FormContainer /> */}
				<C05ListToolbar />
				<C05ListHeader />
				<C05ListViewContainer />
			</FormProvider>
			<C05DialogContainer />
		</Box>
	);
};

C05FrameContainer.displayName = "C05FrameContainer";
