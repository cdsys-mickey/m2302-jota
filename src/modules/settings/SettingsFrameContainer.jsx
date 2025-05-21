import { FrameBanner, FrameBox } from "@/shared-components";
import { useInit } from "@/shared-hooks/useInit";
import { TabContext } from "@mui/lab";
import { useContext } from "react";
import Settings from "./Settings.mjs";
import { SettingsContext } from "./SettingsContext";
import SettingsFrame from "./SettingsFrame";

export const SettingsFrameContainer = () => {
	const settings = useContext(SettingsContext);
	const { promptChanging } = settings;


	const tab = settings.searchParams.get(Settings.PARAM_TAB)

	useInit(() => {
		promptChanging();
	}, []);

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner title="個人設定" />
			<TabContext value={tab ?? Settings.Tabs.CHANGE_PWORD}>
				{/* <TabContext value={searchParams ?  : Settings.Tabs.CHANGE_PWORD}> */}
				<SettingsFrame handleTabChange={settings.handleTabChange} />
			</TabContext>
			{/* 對話框 */}
		</FrameBox>
	);
};

SettingsFrameContainer.displayName = "SettingsFrameContainer";
