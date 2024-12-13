import Styles from "@/modules/md-styles";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { StdPrintDialogContainer } from "../../../components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "../../../contexts/std-print/StdPrintProvider";
import A08Frame from "./A08Frame";

export const A08FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="AreaCod">
			<A08Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A08FrameContainer.displayName = "A08Frame";
