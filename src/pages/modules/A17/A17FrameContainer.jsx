import A17Toolbar from "@/components/jobs/A17/A17Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { A17FormContainer } from "../../../components/jobs/A17/A17FormContainer";
import { A17Context } from "@/contexts/A17/A17Context";
import { useBeforeUnload } from "react-router-dom";
import { useUnload } from "@/shared-hooks/useUnload";

export const A17FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const a17 = useContext(A17Context);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useEffect(() => {
	// 	return () => {
	// 		console.log("unmount");
	// 	};
	// }, [a17]);

	useUnload(() => {
		a17.cancelAction();
	}, []);

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer></FrameBannerContainer>
			{/* 工具列 */}
			<A17Toolbar />

			{/* 對話框 */}
			<A17FormContainer />
		</Box>
	);
};

A17FrameContainer.displayName = "A17Frame";
