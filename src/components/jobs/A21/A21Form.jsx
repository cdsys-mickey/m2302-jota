import ContainerEx from "@/shared-components/ContainerEx";
import ControlledYesNoCheckbox from "@/shared-components/controlled/ControlledYesNoCheckbox";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import AuthDeptPicker from "../../AuthDeptPicker";
import TxtExportOutputModePicker from "../txt-export/TxtExportOutputModePicker";

const A21Form = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<AuthDeptPicker
									label="門市編號"
									required
									name="dept"
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerWrapper
									name="SDate"
									label="起始日期"
									clearable
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerWrapper
									name="EDate"
									label="截止日期"
									clearable
									fullWidth
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
									{/* <A21FormButtonsContainer /> */}
									<ButtonWrapper
										startIcon={<OpenInNewIcon />}
										variant="contained"
										color="primary"
										onClick={onSubmit}>
										執行
									</ButtonWrapper>
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
	onSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A21Form.displayName = "A21Form";
export default A21Form;
