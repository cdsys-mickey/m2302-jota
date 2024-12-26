import { useMemo } from "react";
import SettingsFrame from "./SettingsFrame";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";
import { useContext } from "react";
import Styles from "../../modules/md-styles";
import { Box, useTheme } from "@mui/material";
import FrameBanner from "../../shared-components/protected-page/FrameBanner";
import { SettingsContext } from "../../contexts/settings/SettingsContext";
import { TabContext } from "@mui/lab";
import { useInit } from "../../shared-hooks/useInit";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";

export const SettingsFrameContainer = () => {
	const settings = useContext(SettingsContext);
	const { promptChanging } = settings;
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	useInit(() => {
		promptChanging();
	}, []);

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer title="個人設定" />
			<TabContext value={settings.selectedTab}>
				<SettingsFrame handleTabChange={settings.handleTabChange} />
			</TabContext>
			{/* 對話框 */}
		</Box>
	);
};

SettingsFrameContainer.displayName = "SettingsFrameContainer";
