import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { PrintReportButton } from "@/components";
import Auth from "@/modules/md-auth";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import U06DataTypePicker from "./picker/U06DataTypePicker";

const U06Form = memo((props) => {
	const { onSubmit, onDebugSubmit, deptDisabled, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<AppDeptPicker
									label="門市代碼"
									name="SDeptID"
									disableOpenOnInput
									selectOnFocus
									disabled={deptDisabled}
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期"
									leftComponent={
										<DatePickerWrapper
											autoFocus
											name="SDate"
											label="日期區間"
											fullWidth
											validate
											clearable
											borderless
											placeholder="起"
										/>
									}
									rightComponent={
										<DatePickerWrapper
											name="EDate"
											label="日期區間迄"
											fullWidth
											validate
											clearable
											borderless
											placeholder="迄"
										/>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<U06DataTypePicker
									name="RptType"
									label="報表型態"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* <StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/> */}
							</Grid>
						</Grid>
						<FlexBox mt={1.5}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
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

						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

U06Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	deptDisabled: PropTypes.bool,
};

U06Form.displayName = "U06Form";
export default U06Form;



