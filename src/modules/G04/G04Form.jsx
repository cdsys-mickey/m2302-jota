import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { TabContext, TabList } from "@mui/lab";
import { Box } from "@mui/system";
import G04 from "./G04.mjs";
import G04CreateTab from "./tabs/create/G04CreateTab";
import G04DeleteTabContainer from "./tabs/delete/G04DeleteTabContainer";
import G04RecoverTabContainer from "./tabs/recover/G04RecoverTabContainer";



const G04Form = memo((props) => {
	const { selectedTab, handleTabChange, impersonate, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox pt={0}>
						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									<Tab label="形成批次" value={G04.Tabs.CREATE} />
									<Tab label="刪除" value={G04.Tabs.DELETE} />
									{impersonate && (
										<Tab label="復原" value={G04.Tabs.RECOVER} />
									)}
								</TabList>
							</Box>
							<G04CreateTab />
							<G04DeleteTabContainer />
							<G04RecoverTabContainer />
						</TabContext>


					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

G04Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	selectedTab: PropTypes.string,
	handleTabChange: PropTypes.func,
	handleDelSessionChange: PropTypes.func,
	handleDelSessionInputChange: PropTypes.func,
	impersonate: PropTypes.bool
};

G04Form.displayName = "G04Form";
export default G04Form;






