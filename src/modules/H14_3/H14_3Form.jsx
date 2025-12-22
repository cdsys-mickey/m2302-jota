import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import DeptPicker from "@/components/picker/DeptPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import ProdFreeTypePickerV2 from "@/components/prod-free-type-picker/ProdFreeTypePickerV2";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "@/shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H14_3OrderTypePicker from "./pickers/H14_3OrderTypePicker";
import H14_3ReportTypePicker from "./pickers/H14_3ReportTypePicker";

const H14_3Form = memo((props) => {
	const { onSubmit, onDebugSubmit, forNewCustomer = false, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										name="SDate"
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
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
								<RangeGroup legend="貨品區間"
									leftComponent={<ProdPicker
										name="SProdID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"

									/>}
									rightComponent={<ProdPicker
										name="EProdID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"

									/>}
								/>
							</Grid>
							<Grid item xs={12} >
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
								<ProdFreeTypePickerV2
									label="統計型態"
									name="SType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H14_3ReportTypePicker
									label="報表型態"
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H14_3OrderTypePicker
									name="orderType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1} >
							<Grid container spacing={2}>
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
			</form>
		</ContainerEx>
	);
});

H14_3Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H14_3Form.displayName = "H141Form";
export default H14_3Form;







