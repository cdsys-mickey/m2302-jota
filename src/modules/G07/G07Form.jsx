import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { TabContext, TabList } from "@mui/lab";
import G07 from "./G07.mjs";
import G07CarryTabContainer from "./tabs/carry/G07CarryTabContainer";
import G07RestoreTabContainer from "./tabs/restore/G07RestoreTabContainer";

const G07Form = memo((props) => {
	const { selectedTab, handleTabChange, impersonate, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox pt={0}>
						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									<Tab label="結轉" value={G07.Tabs.CARRY} />
									{impersonate && (
										<Tab label="復原" value={G07.Tabs.RESTORE} />
									)}
								</TabList>
							</Box>
							<G07CarryTabContainer />
							<G07RestoreTabContainer />
						</TabContext>


					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

G07Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	impersonate: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	onCustomerChange: PropTypes.func,
	onSessionChanged: PropTypes.func,
	selectedTab: PropTypes.string,
	handleTabChange: PropTypes.func,
};

G07Form.displayName = "G07Form";
export default G07Form;








