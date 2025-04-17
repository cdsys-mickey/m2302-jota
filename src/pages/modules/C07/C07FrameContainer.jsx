import { C07SearchFieldContainer } from "@/components/jobs/C07/search/C07SearchFieldContainer";
import { C07DialogContainer } from "@/components/jobs/C07/dialog/C07DialogContainer";
import C07ListHeader from "@/components/jobs/C07/list/C07ListHeader";
import C07ListToolbar from "@/components/jobs/C07/list/C07ListToolbar";
import { C07ListViewContainer } from "@/components/jobs/C07/list/C07ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C07Drawer from "@/components/jobs/C07/C07Drawer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import C07SearchFormContainer from "@/components/jobs/C07/search/C07SearchFormContainer";

export const C07FrameContainer = () => {
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
					{/* {<C07SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				<ResponsiveLayout columns={24} >
					<C07SearchFormContainer initSize="md" />
					<C07ListToolbar />
					<C07ListHeader />
					<C07ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C07DialogContainer />

		</Box>
	);
};

C07FrameContainer.displayName = "C07FrameContainer";
