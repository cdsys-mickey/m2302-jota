import ContainerEx from "@/shared-components/ContainerEx";
import ControlledDatePicker from "@/shared-components/controlled/ControlledDatePicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ControlledYesNoCheckbox from "../../../shared-components/controlled/ControlledYesNoCheckbox";
import TxtExportOutputModePicker from "../txt-export/TxtExportOutputModePicker";
import AuthDeptPicker from "../../AuthDeptPicker";

const A21Form = memo((props) => {
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
								<AuthDeptPicker
									label="門市編號"
									required
									name="dept"
									// readOnly={true}
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
								<TxtExportOutputModePicker
									name="outputType"
									label="執行方式"
									{...rest}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="客戶名稱"
									name="Name"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="客戶電話"
									name="Tel"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="發票地址"
									name="InvAddr"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="送貨地址"
									name="ToAddr"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="銷貨單號"
									name="SalesID"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="發票編號"
									name="InvNo"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledYesNoCheckbox
									label="宅配通單號"
									name="DelyNo"
									defaultValue={true}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
				</Box>
			</form>
		</ContainerEx>
	);
});

A21Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A21Form.displayName = "A21Form";
export default A21Form;
