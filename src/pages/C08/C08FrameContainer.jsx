import { C08SearchFieldContainer } from "@/components/modules/C08/search/C08SearchFieldContainer";
import { C08DialogContainer } from "@/components/modules/C08/dialog/C08DialogContainer";
import C08ListHeader from "@/components/modules/C08/list/C08ListHeader";
import C08ListToolbar from "@/components/modules/C08/list/C08ListToolbar";
import { C08ListViewContainer } from "@/components/modules/C08/list/C08ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C08FrameContainer = () => {
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
					{<C08SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* <C08FormContainer /> */}
				<C08ListToolbar />
				<C08ListHeader />
				<C08ListViewContainer />
			</FormProvider>
			<C08DialogContainer />
		</Box>
	);
};

C08FrameContainer.displayName = "C08FrameContainer";
