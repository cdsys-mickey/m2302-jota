import A20Toolbar from "@/components/modules/A20/A20Toolbar";
import { A20DialogContainer } from "@/components/modules/A20/dialog/A20DialogContainer";
import A20ListHeader from "@/components/modules/A20/list/A20ListHeader";
import { A20ListViewContainer } from "@/components/modules/A20/list/A20ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BomSearchFieldContainer } from "@/components/modules/A20/search/BomSearchFieldContainer";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import A20 from "../../modules/md-a20";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";

export const A20FrameContainer = () => {
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
					tableName="BomFile_F"
					paramsToJsonData={A20.paramsToJsonData}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<BomSearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A20Toolbar />
					{/* 列表 */}
					<A20ListHeader />
					<A20ListViewContainer />
					{/* 對話框 */}
					<A20DialogContainer />
					<StdPrintDialogContainer />
				</StdPrintProvider>
			</Box>
		</FormProvider>
	);
};

A20FrameContainer.displayName = "A20Frame";
