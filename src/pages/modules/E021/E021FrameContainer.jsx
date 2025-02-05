import { E021DialogContainer } from "@/components/jobs/E021/dialog/E021DialogContainer";
import E021ListHeader from "@/components/jobs/E021/list/E021ListHeader";
import E021ListToolbar from "@/components/jobs/E021/list/E021ListToolbar";
import { E021ListViewContainer } from "@/components/jobs/E021/list/E021ListViewContainer";
import { E021SearchFormContainer } from "@/components/jobs/E021/search/E021SearchFormContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const E021FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm({
		defaultValues: {
			// lvSquared: E021.getSquaredOptionById(E021.SquaredState.NONE),
			// lvSalesType: E021.getSalesTypeOptionById(E021.SalesType.NONE)
		}
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* {<E021SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<E021SearchFormContainer initSize="md" />
				{/* 工具列 */}
				<E021ListToolbar />
				{/* 列表 */}
				<E021ListHeader />
				<E021ListViewContainer />
				{/* 對話框 */}
				<E021DialogContainer />
			</Box>
		</FormProvider>
	);
};

E021FrameContainer.displayName = "E021FrameContainer";



