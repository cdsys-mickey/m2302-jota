import A06Toolbar from "@/components/jobs/A06/A06Toolbar";
import { A06DialogContainer } from "@/components/jobs/A06/dialog/A06DialogContainer";
import A06ListHeader from "@/components/jobs/A06/list/A06ListHeader";
import { A06ListViewContainer } from "@/components/jobs/A06/list/A06ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomerSearchFieldContainer } from "../../components/jobs/A06/search/CustomerSearchFieldContainer";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";
import { A06Context } from "../../contexts/A06/A06Context";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import A06 from "../../modules/md-a06";

export const A06FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const a06 = useContext(A06Context);
	const { mode } = a06;
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
					tableName={
						mode === A06.Mode.NEW_CUSTOMER
							? "CustFileN"
							: "CustFile"
					}
					paramsToJsonData={A06.paramsToJsonData}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<CustomerSearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A06Toolbar />
					{/* 列表 */}
					<A06ListHeader />
					<A06ListViewContainer />
					{/* 對話框 */}
					<A06DialogContainer />
					<StdPrintDialogContainer />
				</StdPrintProvider>
			</Box>
		</FormProvider>
	);
};

A06FrameContainer.displayName = "A06FrameContainer";
