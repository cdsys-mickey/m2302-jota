import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import G02BottomToolbar from "./G02BottomToolbar";
import G02ListHeader from "./list/G02ListHeader";
import G02ListToolbar from "./list/G02ListToolbar";
import { G02ListViewContainer } from "./list/G02ListViewContainer";
import G02SearchFormContainer from "./search/G02SearchFormContainer";

export const G02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const form = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...form}>
			<Box sx={[boxStyles]}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* {<G02SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				<G02SearchFormContainer />
				{/* 工具列 */}
				<G02ListToolbar />
				{/* 列表 */}
				<G02ListHeader />
				<G02ListViewContainer />
				{/* 沖銷總額 */}
				<G02BottomToolbar />
			</Box>
		</FormProvider>
	);
};

G02FrameContainer.displayName = "G02FrameContainer";

