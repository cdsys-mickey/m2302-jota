import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useInit } from "@/shared-hooks/useInit";
import { TabContext } from "@mui/lab";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import Styles from "../md-styles";
import { SettingsContext } from "./SettingsContext";
import SettingsFrame from "./SettingsFrame";
import Settings from "./Settings.mjs";

export const SettingsFrameContainer = () => {
	const settings = useContext(SettingsContext);
	const { promptChanging } = settings;
	const appFrame = useContext(AppFrameContext);
	// const [searchParams] = useSearchParams();

	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	const tab = settings.searchParams.get(Settings.PARAM_TAB)
	// const tab = useMemo(() => {
	// 	return settings.searchParams.get(Settings.PARAM_TAB) || Settings.Tabs.CHANGE_PWORD
	// }, [settings.searchParams])

	useInit(() => {
		promptChanging();
	}, []);

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer title="個人設定" />
			<TabContext value={tab ?? Settings.Tabs.CHANGE_PWORD}>
				{/* <TabContext value={searchParams ?  : Settings.Tabs.CHANGE_PWORD}> */}
				<SettingsFrame handleTabChange={settings.handleTabChange} />
			</TabContext>
			{/* 對話框 */}
		</Box>
	);
};

SettingsFrameContainer.displayName = "SettingsFrameContainer";
