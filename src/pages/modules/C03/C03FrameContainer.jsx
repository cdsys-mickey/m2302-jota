import { C03DialogContainer } from "@/components/jobs/C03/dialog/C03DialogContainer";
import C03ListHeader from "@/components/jobs/C03/list/C03ListHeader";
import C03ListToolbar from "@/components/jobs/C03/list/C03ListToolbar";
import { C03ListViewContainer } from "@/components/jobs/C03/list/C03ListViewContainer";
import C03SearchFormContainer from "@/components/jobs/C03/search/C03SearchFormContainer";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { C03Context } from "@/contexts/C03/C03Context";
import { useQuerySync } from "@/shared-hooks/useQuerySync";
import C03 from "@/modules/md-c03";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import Squared2 from "@/modules/md-squared2";

export const C03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const c03 = useContext(C03Context);
	const { selectById } = c03;
	const searchForm = useForm({
		defaultValues: {
			lvReviewState: C03.getOptionById(C03.ReviewStates.NOT_REVIEWED),
			lvSquared: Squared2.getOptionById(Squared2.SquaredState.NOT_SQUARED)
			// listMode: null,
		},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	const handleQueryChange = useCallback(
		(newValue) => {
			if (newValue) {
				selectById(newValue);
			}
		},
		[selectById]
	);

	useQuerySync("id", handleQueryChange);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					{/* {<C03SearchFieldContainer name="q" />} */}
				</FrameBannerContainer>
				<ResponsiveLayout>
					<C03SearchFormContainer initSize="md" />
					{/* 列表 */}
					<C03ListHeader />
					<C03ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<C03DialogContainer />

		</Box>
	);
};

C03FrameContainer.displayName = "C03FrameContainer";
