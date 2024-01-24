import A04Frame from "./A04Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";

export const A04FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="CaseCod">
			<A04Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A04FrameContainer.displayName = "A04Frame";
