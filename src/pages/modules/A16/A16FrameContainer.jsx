import A16Frame from "./A16Frame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";
import { StdPrintProvider } from "../../../contexts/std-print/StdPrintProvider";
import { StdPrintDialogContainer } from "../../../components/std-print/StdPrintDialogContainer";
import A16 from "../../../modules/md-a16";

export const A16FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider
			tableName="AppDept"
			paramsToJsonData={A16.paramsToJsonData}>
			<A16Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A16FrameContainer.displayName = "A16Frame";
