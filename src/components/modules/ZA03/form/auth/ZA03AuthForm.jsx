import { memo } from "react";
import PropTypes from "prop-types";
import { TabPanel } from "@mui/lab";
import FormSectionBox from "../../../../../shared-components/form/FormSectionBox";
import ZA03GridContainer from "./ZA03GridContainer";
import Users from "../../../../../modules/md-users";
import ZA03AuthToolbar from "./ZA03AuthToolbar";

const ZA03AuthForm = memo((props) => {
	const { editing } = props;
	return (
		<TabPanel
			value={Users.Tabs.AUTH}
			sx={{
				padding: 0,
				"& .MuiInputLabel-root": {
					fontSize: "105%",
				},
				"& .MuiInputLabel-shrink": {
					fontSize: "110%",
					fontWeight: 600,
					left: "-7px",
				},
			}}>
			<ZA03AuthToolbar />
			{/* 權限 */}
			{/* <FormSectionTitle>權限</FormSectionTitle> */}
			<FormSectionBox py={editing ? 2 : 1}>
				<ZA03GridContainer />
			</FormSectionBox>
		</TabPanel>
	);
});

ZA03AuthForm.propTypes = {
	editing: PropTypes.bool,
};

ZA03AuthForm.displayName = "ZA03AuthForm";
export default ZA03AuthForm;
