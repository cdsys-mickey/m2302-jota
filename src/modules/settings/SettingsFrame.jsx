import { TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import Settings from "./Settings.mjs";
import { ChangePwordFormContainer } from "./change-pword/ChangePwordFormContainer";
import { InstructionFormContainer } from "./instruction/InstructionFormContainer";
import JobMenuFrameContainer from "./job-menu/JobMenuFrameContainer";

const SettingsFrame = memo((props) => {
	const { handleTabChange, ...rest } = props;
	return (
		<Box>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<TabList onChange={handleTabChange}>
					<Tab label="密碼變更" value={Settings.Tabs.CHANGE_PWORD} />
					<Tab label="操作提示" value={Settings.Tabs.INSTRUCTION} />
					<Tab label="功能排序" value={Settings.Tabs.MENU} />
				</TabList>
			</Box>
			<TabPanel value={Settings.Tabs.CHANGE_PWORD}>
				<ChangePwordFormContainer />
			</TabPanel>
			<TabPanel value={Settings.Tabs.INSTRUCTION}>
				<InstructionFormContainer />
			</TabPanel>
			<TabPanel value={Settings.Tabs.MENU} sx={theme => ({ paddingTop: theme.spacing(1) })}>
				<JobMenuFrameContainer />
			</TabPanel>
		</Box>
	);
});

SettingsFrame.propTypes = {
	handleTabChange: PropTypes.func,
};

SettingsFrame.displayName = "SettingsFrame";
export default SettingsFrame;
