import A17Toolbar from "@/components/jobs/A17/A17Toolbar";
import { A17Context } from "@/contexts/A17/A17Context";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useUnload } from "@/shared-hooks/useUnload";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { A17FormContainer } from "@/components/jobs/A17/A17FormContainer";

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
