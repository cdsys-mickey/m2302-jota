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

const A18Form = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest}>
				<Box
					pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "105%",
							// fontWeight: 500,
							// color: "rgba(0, 0, 0, 0.8 )",
						},
						"& .MuiInputLabel-shrink": {
							fontSize: "120%",
							fontWeight: 600,
							left: "-2px",
							// color: theme.palette.primary.main,
						},
					})}>
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
								{/* <ControlledTextField
									label="檔案"
									name="RealFile"
									size="small"
								/> */}
								{/* <DbTablePicker
									label="檔案"
									required
									// name="RealFile"
									name="table"
									size="small"
								/> */}
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
						</Grid>
					</FormSectionBox>
				</Box>
			</form>
		</ContainerEx>
	);
});

A18Form.propTypes = {
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A18Form.displayName = "A18Form";
export default A18Form;