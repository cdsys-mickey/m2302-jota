import ContainerEx from "@/shared-components/ContainerEx";
import ControlledDatePicker from "@/shared-components/date-picker/ControlledDatePicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ControlledYesNoCheckbox from "@/shared-components/controlled/ControlledYesNoCheckbox";
import TxtExportOutputModePicker from "../txt-export/TxtExportOutputModePicker";
import AuthDeptPicker from "../../AuthDeptPicker";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { A21FormButtonsContainer } from "./buttons/A21FormButtonsContainer";
import FormBox from "@/shared-components/form/FormBox";

const A21Form = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest}>
				<FormBox pt={1}>
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
							<Grid item xs={12}>
								<ControlledYesNoCheckbox
									label="客戶名稱"
									name="Name"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="客戶電話"
									name="Tel"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="發票地址"
									name="InvAddr"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="送貨地址"
									name="ToAddr"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="銷貨單號"
									name="SalesID"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="發票編號"
									name="InvNo"
									defaultValue={true}
								/>
								<ControlledYesNoCheckbox
									label="宅配通單號"
									name="DelyNo"
									defaultValue={true}
								/>
							</Grid>
							<Grid item xs={12}>
								<FlexToolbar align="right">
									<A21FormButtonsContainer />
								</FlexToolbar>
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox>
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
