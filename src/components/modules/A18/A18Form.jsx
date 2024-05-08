import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import ControlledDatePicker from "../../../shared-components/controlled/ControlledDatePicker";
import FormSectionBox from "../../../shared-components/form/FormSectionBox";
import AppDeptPicker from "../../fields/AppDeptPicker";
import { RealFilePickerContainer } from "../../picker/RealFilePickerContainer";
import StdPrintOutputModePicker from "../../std-print/StdPrintOutputModePicker";
import A18ActionPicker from "./picker/A18ActionPicker";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import { A18FormButtonsContainer } from "./buttons/A18FormButtonsContainer";
import FormBox from "../../../shared-components/form/FormBox";

const A18Form = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest}>
				<FormBox pt={1}>
					<FormSectionBox py={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<AppDeptPicker
									filterByOperator
									label="查詢門市"
									required
									name="dept"
									// readOnly={true}
								/>
							</Grid>

							<Grid item xs={12}>
								<RealFilePickerContainer
									name="table"
									label="檔案"
									// required
									// name="RealFile"
									size="small"
								/>
							</Grid>

							<Grid item xs={12}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid>

							<Grid item xs={12}>
								<ControlledDatePicker
									name="SDate"
									label="起始日期"
								/>
							</Grid>
							<Grid item xs={12}>
								<ControlledDatePicker
									name="EDate"
									label="截止日期"
								/>
							</Grid>
							<Grid item xs={12}>
								<A18ActionPicker name="action" label="行為" />
							</Grid>

							<FlexToolbar align="right">
								<A18FormButtonsContainer />
							</FlexToolbar>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

A18Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A18Form.displayName = "A18Form";
export default A18Form;
