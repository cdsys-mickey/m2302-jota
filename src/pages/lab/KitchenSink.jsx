import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import FrameBanner from "../../shared-components/protected-page/FrameBanner";
import { useMemo } from "react";
import { useScrollable } from "../../shared-hooks/useScrollable";
import ContainerEx from "../../shared-components/ContainerEx";

export const KitchenSink = memo(
	forwardRef((props, ref) => {
		const { tabs, handleTabChange, selectedTab, height } = props;

		const scrollable = useScrollable({ height });

		return (
			<Box ref={ref} py={1} px={3}>
				<ContainerEx maxWidth="lg">
					<FrameBanner title="元件測試" alt="kitchen-sink" />
					<TabContext value={selectedTab}>
						<Box mt={1}>
							<Paper sx={[scrollable.scroller]}>
								<TabList
									value={selectedTab}
									onChange={handleTabChange}
									variant="scrollable"
									scrollButtons>
									{tabs &&
										tabs.map((tab) => (
											<Tab
												key={tab.value}
												label={tab.label}
												value={tab.value}
											/>
										))}
								</TabList>

								{tabs &&
									tabs.map((tab) => {
										const TabPanelComponent = tab.Component;
										return (
											<TabPanel
												key={tab.value}
												value={tab.value}>
												{tab.component}
												{TabPanelComponent && (
													<TabPanelComponent />
												)}
											</TabPanel>
										);
									})}
							</Paper>
						</Box>
					</TabContext>
				</ContainerEx>
			</Box>
		);
	})
);

KitchenSink.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tabs: PropTypes.array,
	handleTabChange: PropTypes.func,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

KitchenSink.displayName = "KitchenSink";
