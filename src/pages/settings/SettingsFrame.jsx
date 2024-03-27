import { memo } from "react";
import PropTypes from "prop-types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import FlexGrid from "../../shared-components/FlexGrid";
import Settings from "../../modules/md-settings";
import { ChangePwordFormContainer } from "./change-pword/ChangePwordFormContainer";

const SettingsFrame = memo((props) => {
	const { handleTabChange, ...rest } = props;
	return (
		<Box>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<TabList onChange={handleTabChange}>
					<Tab label="密碼變更" value={Settings.Tabs.CHANGE_PWORD} />
				</TabList>
			</Box>
			<TabPanel value={Settings.Tabs.CHANGE_PWORD}>
				<ChangePwordFormContainer />
			</TabPanel>
		</Box>
	);
});

SettingsFrame.propTypes = {
	handleTabChange: PropTypes.func,
};

SettingsFrame.displayName = "SettingsFrame";
export default SettingsFrame;
