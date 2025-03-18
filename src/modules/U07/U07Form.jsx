import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import AppDeptPicker from "@/components/fields/AppDeptPicker";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import Auth from "@/modules/md-auth";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import U07DataTypePicker from "./picker/U07DataTypePicker";

const U07Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<AppDeptPicker
									autoFocus
									label="門市代碼"
									name="SDeptID"
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期"
									leftComponent={
										<DatePickerWrapper
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
								<U07DataTypePicker
									name="RptType"
									label="資料型態"
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
										<PrintButtonContainer
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

U07Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U07Form.displayName = "U07Form";
export default U07Form;




