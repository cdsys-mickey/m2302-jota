import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DeptPicker from "@/components/picker/DeptPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { PrintReportButton } from "@/components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H26OrderTypePicker from "./pickers/H26OrderTypePicker";
import H26ReportTypePicker from "./pickers/H26ReportTypePicker";

const H26Form = memo((props) => {
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
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="預計到貨區間"
									leftComponent={<DatePickerWrapper
										name="SArrDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
									/>}
									rightComponent={<DatePickerWrapper
										name="EArrDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
									/>}
								/>
							</Grid>
							<Grid item xs={12}>
								<RangeGroup legend="貨品區間"
									leftComponent={<ProdPicker
										label=""
										name="SProdID"
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
										slotProps={{
											paper: {
												sx: {
													width: 360,
												},
											},
										}}
									/>}
									rightComponent={<ProdPicker
										label=""
										name="EProdID"
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"
										slotProps={{
											paper: {
												sx: {
													width: 360,
												},
											},
										}}
									/>}
								/>
							</Grid>
							<Grid item xs={12}>
								<RangeGroup legend="門市區間"
									leftComponent={<DeptPicker
										name="SDeptID"
										label=""
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DeptPicker
										name="EDeptID"
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
								<H26ReportTypePicker
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H26OrderTypePicker
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
		</ContainerEx>
	);
});

H26Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H26Form.displayName = "H26Form";
export default H26Form;







