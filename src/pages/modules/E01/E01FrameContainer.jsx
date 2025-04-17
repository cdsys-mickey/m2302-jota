import { E01DialogContainer } from "@/components/jobs/E01/dialog/E01DialogContainer";
import { E01ListFormContainer } from "@/components/jobs/E01/list/E01ListFormContainer";
import E01ListHeader from "@/components/jobs/E01/list/E01ListHeader";
import E01ListToolbar from "@/components/jobs/E01/list/E01ListToolbar";
import { E01ListViewContainer } from "@/components/jobs/E01/list/E01ListViewContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const E01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm({
		defaultValues: {
			// lvSquared: E01.getSquaredOptionById(E01.SquaredState.NONE),
			// lvSalesType: E01.getSalesTypeOptionById(E01.SalesType.NONE)
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
					{/* {<E01SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<E01ListFormContainer />
				{/* 工具列 */}
				<E01ListToolbar />
				{/* 列表 */}
				<E01ListHeader />
				<E01ListViewContainer />
				{/* 對話框 */}
				<E01DialogContainer />
			</Box>
		</FormProvider>
	);
};

E01FrameContainer.displayName = "E01FrameContainer";


