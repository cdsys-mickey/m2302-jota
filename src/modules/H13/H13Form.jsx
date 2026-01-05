import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";

const H13Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth={"30rem"} alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										minDate={"2026/01/01"}
										name="SDate"
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										minDate={"2026/01/01"}
										name="EDate"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="客戶區間"
									leftComponent={<CustomerPicker
										name="SCustID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										slotProps={{
											paper: {
												sx: {
													width: 360,
												},
											},
										}}
										borderless
										placeholder="起"
									/>}
									rightComponent={<CustomerPicker
										name="ECustID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										slotProps={{
											paper: {
												sx: {
													width: 360,
												},
											},
										}}
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Grid item xs={12} sm={6}>
									<CheckboxExField
										label="含試贈樣"
										name="InclTest"
										defaultValue={true}
										variant="outlined"
										size="small"
										fullWidth
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldWrapper
									name="Local"
									label="本地批發毛利比(%)"
									type="number"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldWrapper
									name="Out"
									label="外地批發毛利比(%)"
									type="number"
									size="small"
									fullWidth
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={1}>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									{/* <StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/> */}
								</FlexGrid>
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
			</form >
		</ContainerEx >
	);
});

H13Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H13Form.displayName = "H13Form";
export default H13Form;






