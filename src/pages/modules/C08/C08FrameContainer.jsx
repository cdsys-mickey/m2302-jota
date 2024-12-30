import { C08DialogContainer } from "@/components/jobs/C08/dialog/C08DialogContainer";
import C08ListHeader from "@/components/jobs/C08/list/C08ListHeader";
import C08ListToolbar from "@/components/jobs/C08/list/C08ListToolbar";
import { C08ListViewContainer } from "@/components/jobs/C08/list/C08ListViewContainer";
import { C08SearchFieldContainer } from "@/components/jobs/C08/search/C08SearchFieldContainer";
import C08SearchFormContainer from "@/components/jobs/C08/search/C08SearchFormContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C08FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	// const c08 = useContext(C08Context);
	const searchForm = useForm({
		defaultValues: {},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useInit(() => {
	// 	c08.loadStockPword();
	// }, []);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				<FrameBannerContainer>
					{/* <C08SearchFieldContainer name="q" /> */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<C08SearchFormContainer initSize="md" />
					<C08ListToolbar />
					<C08ListHeader />
					<C08ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C08DialogContainer />

		</Box>
	);
};

C08FrameContainer.displayName = "C08FrameContainer";
