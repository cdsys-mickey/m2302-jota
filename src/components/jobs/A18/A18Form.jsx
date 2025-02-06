import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { RealFilePicker } from "@/components/picker/RealFilePicker";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import ContainerEx from "@/shared-components/ContainerEx";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A18ActionPicker from "./picker/A18ActionPicker";
import JobPicker from "@/components/picker/JobPicker";
import { DeptUserPicker } from "@/components/picker/DeptUserPicker";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { A18OrderByPicker } from "./A18OrderByPicker";

const A18Form = memo((props) => {
	const { onSubmit, onDebugSubmit, deptDisabled, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<AppDeptPicker
									filterByOperator
									label="查詢門市"
									name="dept"
									disableOpenOnInput
									selectOnFocus
									disabled={deptDisabled}
								/>
							</Grid>
							<Grid item xs={6}>
								<DatePickerWrapper
									name="SDate"
									label="起始日期"
									validate
								/>
							</Grid>
							<Grid item xs={6}>
								<DatePickerWrapper
									name="EDate"
									label="截止日期"
									validate
								/>
							</Grid>

							<Grid item xs={12}>
								<RealFilePicker
									name="table"
									label="檔案"
									// required
									// name="RealFile"
									size="small"
									// disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<JobPicker
									name="job"
									label="作業項目"
									size="small"
									selectOnFocus
									disableOpenOnInput
									virtualized
								/>
							</Grid>
							<Grid item xs={12}>
								<DeptUserPicker
									name="operator"
									label="作業人員"
									size="small"
									selectOnFocus
									disableOpenOnInput
									virtualized
								/>
							</Grid>
							<Grid item xs={12}>
								<TextFieldWrapper
									label="IP位址"
									name="ipAddr"
									fullWidth
									size="small"
									clearable
								/>
							</Grid>
							<Grid item xs={6}>
								<A18ActionPicker name="action" label="行為" />
							</Grid>
							<Grid item xs={6}>
								<A18OrderByPicker
									name="orderBy"
									label="排序"
								/>
							</Grid>
							<Grid item xs={6}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid>




							<FlexToolbar align="right">
								<ButtonGroup>
									<DebugDialogButtonContainer onClick={onDebugSubmit} />
									<ButtonWrapper
										responsive
										startIcon={<OpenInNewIcon />}
										variant="contained"
										color="primary"
										type="submit"
									>
										執行
									</ButtonWrapper>
								</ButtonGroup>
							</FlexToolbar>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

A18Form.propTypes = {
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	deptDisabled: PropTypes.bool,
	readError: PropTypes.object,
};

A18Form.displayName = "A18Form";
export default A18Form;
