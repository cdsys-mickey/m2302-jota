import { useContext } from "react";
import A03Frame from "./A03Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import Styles from "@/modules/Styles.mjs";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";

export const A03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="ClassCod">
			<A03Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A03FrameContainer.displayName = "A03Frame";
