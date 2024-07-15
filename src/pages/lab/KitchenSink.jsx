import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OptionPickerTest from "./OptionPickerTest";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { LoadingFrame } from "../../shared-components/protected-page/LoadingFrame";
import { OptionPickerContext } from "../../shared-components/option-picker/listbox/OptionPickerContext";
import { OptionPickerProvider } from "../../shared-components/option-picker/OptionPickerProvider";

export const KitchenSink = memo(
	forwardRef((props, ref) => {
		const { handleTabChange, selectedTab, ...rest } = props;

		return (
			<Box ref={ref}>
				<Link to="/home">回首頁</Link>
				<TabContext value={selectedTab}>
					<Box
						sx={{
							backgroundColor: "#fff",
						}}>
						<TabList
							value={selectedTab}
							onChange={handleTabChange}
							variant="scrollable"
							scrollButtons>
							<Tab label="OptionPicker" value={0}></Tab>
							<Tab label="LoadingFrame" value={1}></Tab>
						</TabList>

						<TabPanel value={0}>
							<OptionPickerTest />
						</TabPanel>
						<TabPanel value={1}>
							<LoadingFrame />
						</TabPanel>
					</Box>
				</TabContext>
			</Box>
		);
	})
);

KitchenSink.propTypes = {
	handleTabChange: PropTypes.func,
	selectedTab: PropTypes.number,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

KitchenSink.displayName = "KitchenSink";
