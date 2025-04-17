import ZA03 from "@/modules/ZA03.mjs";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TabPanel } from "@mui/lab";
import PropTypes from "prop-types";
import { memo } from "react";
import { ZA03AuthGridToolbarContainer } from "./ZA03AuthGridToolbarContainer";
import ZA03GridContainer from "./ZA03GridContainer";

const ZA03AuthForm = memo((props) => {
	const { editing } = props;
	return (
		<TabPanel
			value={ZA03.Tabs.AUTH}
			sx={{
				padding: 0,
				"& .MuiInputLabel-root": {
					fontSize: "105%",
				},
				"& .MuiInputLabel-shrink": {
					fontSize: "110%",
					fontWeight: 600,
					left: "0px",
				},
			}}>
			{/* 權限 */}
			{/* <FormSectionTitle>權限</FormSectionTitle> */}
			<FormSectionBox pb={1} mt={1} px={1}>
				<ZA03AuthGridToolbarContainer />
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
