import { E03DialogContainer } from "@/components/jobs/E03/dialog/E03DialogContainer";
import { E03ListFormContainer } from "@/components/jobs/E03/list/E03ListFormContainer";
import E03ListHeader from "@/components/jobs/E03/list/E03ListHeader";
import E03ListToolbar from "@/components/jobs/E03/list/E03ListToolbar";
import { E03ListViewContainer } from "@/components/jobs/E03/list/E03ListViewContainer";
import E03 from "@/modules/E021/E021.mjs";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const E03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm({
		defaultValues: {
			lvSquared: E03.getSquaredOptionById(E03.SquaredState.NONE),
			lvSalesType: E03.getSalesTypeOptionById(E03.SalesType.NONE)
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
					{/* {<E03SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				{/* 篩選工具列 */}
				<E03ListFormContainer />
				{/* 工具列 */}
				<E03ListToolbar />
				{/* 列表 */}
				<E03ListHeader />
				<E03ListViewContainer />
				{/* 對話框 */}
				<E03DialogContainer />
			</Box>
		</FormProvider>
	);
};

E03FrameContainer.displayName = "E03FrameContainer";



