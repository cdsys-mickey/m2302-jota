import { D05SearchFieldContainer } from "@/components/jobs/D05/search/D05SearchFieldContainer";
import { D05DialogContainer } from "@/components/jobs/D05/dialog/D05DialogContainer";
import D05ListHeader from "@/components/jobs/D05/list/D05ListHeader";
import D05ListToolbar from "@/components/jobs/D05/list/D05ListToolbar";
import { D05ListViewContainer } from "@/components/jobs/D05/list/D05ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import D05SearchFormContainer from "@/components/jobs/D05/search/D05SearchFormContainer";

export const D05FrameContainer = () => {
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
					{/* {<D05SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<D05SearchFormContainer initSize="md" />
					<D05ListToolbar />
					<D05ListHeader />
					<D05ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<D05DialogContainer />
		</Box>
	);
};

D05FrameContainer.displayName = "D05FrameContainer";
