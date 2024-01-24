import { useContext } from "react";
import A01Frame from "./ZZA01Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { Box, useTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { A01DialogContainer } from "../../components/modules/A01/dialog/A01DialogContainer";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { ProdSearchFieldContainer } from "@/components/modules/A01/search/ProdSearchFieldContainer";
import A01Toolbar from "@/components/modules/A01/A01Toolbar";
import A01ListHeader from "@/components/modules/A01/list/A01ListHeader";
import { A01ListViewContainer } from "@/components/modules/A01/list/A01ListViewContainer";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import A01 from "../../modules/md-a01";

export const A01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			<StdPrintProvider
				tableName="StoreFile_F"
				paramsToJsonData={A01.paramsToJsonData}>
				<FormProvider {...searchForm}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<ProdSearchFieldContainer name="qs" />}
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
