import MsgToolbar from "@/components/messages/MsgToolbar";
import MsgListHeader from "@/components/messages/list/MsgListHeader";
import { MsgListViewContainer } from "@/components/messages/list/MsgListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FrameBanner from "../../shared-components/protected-page/FrameBanner";

export const MsgFrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				{/* 標題 */}
				<FrameBanner title="推播訊息通知" alt="推播" />
				{/* 工具列 */}
				<MsgToolbar />
				{/* 列表 */}
				<MsgListHeader />
				<MsgListViewContainer />
			</Box>
		</FormProvider>
	);
};

MsgFrameContainer.displayName = "MsgFrameContainer";
