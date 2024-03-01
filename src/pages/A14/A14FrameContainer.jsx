import A14Frame from "./A14Frame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";

export const A14FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="ReasonCod">
			<A14Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />;
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A14FrameContainer.displayName = "A14Frame";
