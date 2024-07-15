import A17Toolbar from "@/components/jobs/A17/A17Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { A17FormContainer } from "../../components/jobs/A17/A17FormContainer";
import { eachHourOfInterval } from "date-fns";
import { useEffect } from "react";
import CrudContext from "../../contexts/crud/CrudContext";

export const A17FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const crud = useContext(CrudContext);
	const { cancelAction } = crud;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	useEffect(() => {
		return () => {
			console.log("unmount");
		};
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
