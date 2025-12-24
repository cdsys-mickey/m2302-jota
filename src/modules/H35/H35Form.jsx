import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DeptPicker from "@/components/picker/DeptPicker";
import { PrintReportButton } from "@/components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H35OrderTypePicker from "./pickers/H35OrderTypePicker";
import H35ReportTypePicker from "./pickers/H35ReportTypePicker";

const H35Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										autoFocus
										name="SDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} >
								<RangeGroup legend="撥出門市區間"
									leftComponent={<DeptPicker
										name="SODeptID"
										label=""
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DeptPicker
										name="EODeptID"
										label=""
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H35ReportTypePicker
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H35OrderTypePicker
									name="orderType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="flex-start">
										<StdPrintOutputModePicker
											required
											name="outputType"
											label="執行方式"
										/>
									</FlexBox> */}
								</Grid>
								<Grid item xs={12} sm={6}>
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
		</ContainerEx >
	);
});

H35Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H35Form.displayName = "H35Form";
export default H35Form;









