import Styles from "@/modules/Styles.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A16G from "@/modules/md-a16g";
import A16GFrame from "./A16GFrame";

export const A16GFrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider
			tableName="AppDept"
			paramsToJsonData={A16G.paramsToJsonData}>
			<A16GFrame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A16GFrameContainer.displayName = "A16GFrameContainer";
