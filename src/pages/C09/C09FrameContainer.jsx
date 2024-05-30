import { C09SearchFieldContainer } from "@/components/modules/C09/search/C09SearchFieldContainer";
import { C09DialogContainer } from "@/components/modules/C09/dialog/C09DialogContainer";
import C09ListHeader from "@/components/modules/C09/list/C09ListHeader";
import C09ListToolbar from "@/components/modules/C09/list/C09ListToolbar";
import { C09ListViewContainer } from "@/components/modules/C09/list/C09ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C09FrameContainer = () => {
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
					{<C09SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* <C09FormContainer /> */}
				<C09ListToolbar />
				<C09ListHeader />
				<C09ListViewContainer />
			</FormProvider>
			<C09DialogContainer />
		</Box>
	);
};

C09FrameContainer.displayName = "C09FrameContainer";
