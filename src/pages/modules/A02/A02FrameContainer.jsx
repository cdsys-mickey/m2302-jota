import A02Frame from "./A02Frame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/Styles.mjs";
import { useTheme } from "@mui/material";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";

export const A02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="PackCod">
			<A02Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A02FrameContainer.displayName = "A02Frame";
