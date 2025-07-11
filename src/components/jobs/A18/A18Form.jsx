import { PrintReportButton } from "@/components";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { DeptUserPicker } from "@/components/picker/DeptUserPicker";
import JobPicker from "@/components/picker/JobPicker";
import { RealFilePicker } from "@/components/picker/RealFilePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import RangeGroup from "@/shared-components/RangeGroup";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A18OrderByPicker } from "./A18OrderByPicker";
import A18ActionPicker from "./picker/A18ActionPicker";
import Auth from "@/modules/md-auth";

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
									scope={Auth.SCOPES.BRANCH_HQ}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										name="SDate"
										label="起始日期"
										validate
										borderless
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label="截止日期"
										validate
										borderless
									/>}
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
								{/* <StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/> */}
							</Grid>

							<Grid item xs={12}>
								<FlexBox justifyContent="flex-end">
									<PrintReportButton
										color="primary"
										variant="contained"
										onSubmit={onSubmit}
										onDebugSubmit={onDebugSubmit}
									/>
								</FlexBox>
							</Grid>
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
