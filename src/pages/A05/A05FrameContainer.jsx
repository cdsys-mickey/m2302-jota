import A05Toolbar from "@/components/jobs/A05/A05Toolbar";
import { A05DialogContainer } from "@/components/jobs/A05/dialog/A05DialogContainer";
import A05ListHeader from "@/components/jobs/A05/list/A05ListHeader";
import { A05ListViewContainer } from "@/components/jobs/A05/list/A05ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SupplierSearchFieldContainer } from "../../components/jobs/A05/search/SupplierSearchFieldContainer";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import A05 from "../../modules/md-a05";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";
import { useInit } from "../../shared-hooks/useInit";
import { A05Context } from "../../contexts/A05/A05Context";

export const A05FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();

	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				<StdPrintProvider
					tableName="FactFile"
					paramsToJsonData={A05.paramsToJsonData}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<SupplierSearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A05Toolbar />
					{/* 列表 */}
					<A05ListHeader />
					<A05ListViewContainer />
					{/* 對話框 */}
					<A05DialogContainer />
					<StdPrintDialogContainer />
				</StdPrintProvider>
			</Box>
		</FormProvider>
	);
};

A05FrameContainer.displayName = "A05Frame";
