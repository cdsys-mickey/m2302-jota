import { FrameBanner, FrameBox } from "@/shared-components";
import UserSettingEditor from "@/shared-modules/UserSettingEditor/UserSettingEditor";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useContext } from "react";
import UserSettings from "../UserSettings.mjs";
import P38 from "./P38.mjs";
import P38Context from "./P38Context";
import P38TitleFormContainer from "./tabs/title/form/P38TitleFormContainer";
import P38TitleProvider from "./tabs/title/P38TitleProvider";
import P38TitleTab from "./tabs/title/P38TitleTab";
import P38AliasTab from "./tabs/alias/P38AliasTab";


export const P38FrameContainer = () => {
	const p38 = useContext(P38Context)

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner>
			</FrameBanner>

			{/* 工具列 */}
			{/* <P38Toolbar /> */}
			<TabContext value={p38.selectedTab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={p38.handleTabChange}>
						<P38TitleTab />
						<P38AliasTab />
					</TabList>
				</Box>
				<TabPanel value={P38.TABS.TITLE}>
					<P38TitleProvider>
						<P38TitleFormContainer />
					</P38TitleProvider>
				</TabPanel>
				<TabPanel value={P38.TABS.ALIAS}>
					<UserSettingEditor
						id={UserSettings.KEYS.CMS_GROUP_ALIAS}
						moduleId="P38"
						scope={UserSettings.SCOPES.DEPT}
						defaultValues={P38.DEFAULT_ALIAS_VALUES}
					/>
				</TabPanel>
			</TabContext>
		</FrameBox>
	);
};

P38FrameContainer.displayName = "P38FrameContainer";




