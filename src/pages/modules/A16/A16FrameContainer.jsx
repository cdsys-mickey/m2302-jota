import A16Toolbar from "@/components/jobs/A16/A16Toolbar";
import { A16DialogContainer } from "@/components/jobs/A16/dialog/A16DialogContainer";
import A16ListHeader from "@/components/jobs/A16/list/A16ListHeader";
import { A16ListViewContainer } from "@/components/jobs/A16/list/A16ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { A16SearchFieldContainer } from "@/components/jobs/A16/search/A16SearchFieldContainer";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A16 from "@/modules/md-a16";

export const A16FrameContainer = () => {
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
					tableName="AppDept"
					paramsToJsonData={A16.paramsToJsonData}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<A16SearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A16Toolbar />
					{/* 列表 */}
					<A16ListHeader />
					<A16ListViewContainer />
					{/* 對話框 */}
					<A16DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</Box>
		</FormProvider>
	);
};

A16FrameContainer.displayName = "A16Frame";

