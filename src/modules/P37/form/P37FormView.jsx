import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { memo } from "react";
import P37 from "../P37.mjs";
import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import P37DomesticTabView from "./domestic/P37DomesticTabView";
import P37Toolbar from "../P37Toolbar";
import P37DomesticTabContainer from "./domestic/P37DomesticTabContainer";
import P37AgencyTabContainer from "./agency/P37AgencyTabContainer";
import P37BusTabContainer from "./bus/P37BusTabContainer";
import P37ChinaTabContainer from "./china/P37ChinaTabContainer";

const P37FormView = memo((props) => {
	const { selectedTab, handleTabChange, editing, groupTypes, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<FormBox {...rest}>
				<form>
					<FormSectionBox pt={1.5}>

						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									{groupTypes.map((option) => {
										const disabled = editing && option.id != selectedTab;
										return (
											<Tab key={option.id} label={option.label} value={option.id} disabled={disabled} />
										)
									})}
								</TabList>

							</Box>
							<P37Toolbar />
							<P37DomesticTabContainer />
							<P37AgencyTabContainer />
							<P37BusTabContainer />
							<P37ChinaTabContainer />
						</TabContext>
					</FormSectionBox>
				</form>
			</FormBox>
		</ContainerEx >
	);
})

P37FormView.propTypes = {
	loadError: PropTypes.object,
	slotProps: PropTypes.object,
	selectedTab: PropTypes.string,
	handleTabChange: PropTypes.func,
	editing: PropTypes.bool,
	groupTypes: PropTypes.array
}

P37FormView.displayName = "P37FormView";
export default P37FormView;