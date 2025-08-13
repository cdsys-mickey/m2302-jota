import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { TabContext, TabList } from "@mui/lab";
import REB from "./REB.mjs";
import REBPosTabContainer from "./tabs/pos-data/REBPosTabContainer";
import REBSalesTabContainer from "./tabs/sales-data/REBSalesTabContainer";

const REBForm = memo((props) => {
	const { selectedTab, handleTabChange, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox pt={0}>
						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									{REB.tabs.map(tab => (
										<Tab key={tab.id} label={tab.label} value={tab.id} />
									))}
								</TabList>
							</Box>
							<REBSalesTabContainer />
							<REBPosTabContainer />
						</TabContext>


					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

REBForm.propTypes = {
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

REBForm.displayName = "REBForm";
export default REBForm;









