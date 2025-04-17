import A11Frame from "./A11Frame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/Styles.mjs";
import { useTheme } from "@mui/material";
import { StdPrintProvider } from "../../../contexts/std-print/StdPrintProvider";
import { StdPrintDialogContainer } from "../../../components/std-print/StdPrintDialogContainer";

export const A11FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<StdPrintProvider tableName="BankCod">
			<A11Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A11FrameContainer.displayName = "A11Frame";
