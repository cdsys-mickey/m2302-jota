import A01Toolbar from "@/components/jobs/A01/A01Toolbar";
import { A01DialogContainer } from "@/components/jobs/A01/dialog/A01DialogContainer";
import A01ListHeader from "@/components/jobs/A01/list/A01ListHeader";
import { A01ListViewContainer } from "@/components/jobs/A01/list/A01ListViewContainer";
import { A01SearchFieldContainer } from "@/components/jobs/A01/search/A01SearchFieldContainer";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { A01Context } from "@/contexts/A01/A01Context";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A01 from "@/modules/md-a01";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useQuerySync } from "@/shared-hooks/useQuerySync";
import { Box, useTheme } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const A01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const a01 = useContext(A01Context);
	const { selectById } = a01;
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	const handleQuerySync = useCallback(
		(newValue) => {
			if (newValue) {
				selectById(newValue);
			}
		},
		[selectById]
	);

	useQuerySync("target", handleQuerySync);

	return (
		<Box sx={[boxStyles]}>
			<StdPrintProvider
				tableName="StoreFile_F"
				paramsToJsonData={A01.paramsToJsonData(a01.mode)}>
				<FormProvider {...searchForm}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<A01SearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A01Toolbar />
					{/* 列表 */}
					<A01ListHeader />
					<A01ListViewContainer />
				</FormProvider>

				{/* 對話框 */}
				<A01DialogContainer />
				<StdPrintDialogContainer />

			</StdPrintProvider>
		</Box>
	);
};

A01FrameContainer.displayName = "A01Frame";
