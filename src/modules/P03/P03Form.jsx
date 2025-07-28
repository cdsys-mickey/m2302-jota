import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import AreaPicker from "@/components/jobs/A06/form/fields/AreaPicker";
import ChannelPicker from "@/components/jobs/A06/form/fields/ChannelPicker";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { PrintReportButton } from "@/components";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import P03ReportTypePicker from "./pickers/P03ReportTypePicker";
import P03OrderTypePicker from "./pickers/P03OrderTypePicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import P03CalTypePicker from "./pickers/P03CalTypePicker";

const P03Form = memo((props) => {
	const { forNewCustomer, onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>

							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期"
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
							<Grid item xs={12} sm={6}>
								<SalesTypePicker
									name="SalType"
									label="零售"
									fullWidth
									validate
									clearable
								/>
							</Grid>
						</Grid>
						<CheckboxExWrapper
							label="零售客戶"
							name="retail"
							defaultValue={false}
							size="small"
						/>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend={forNewCustomer ? "新客戶區間" : "客戶區間"}
									leftComponent={<CustomerPicker
										name="SCustID"
										size="small"
										virtualize
										forNew={forNewCustomer}
										// optionLabelSize="md"
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
										forNew={forNewCustomer}
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
							{/* 區域 */}
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="客戶區域"
									leftComponent={<AreaPicker
										name="SAreaID"
										label="客戶區域"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<AreaPicker
										name="EAreaID"
										label="截止區域"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							{/* 通路 */}
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="客戶通路"
									leftComponent={<ChannelPicker
										name="SLineID"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<ChannelPicker
										name="ELineID"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CheckboxExWrapper
									label="含試贈樣"
									name="InclTest"
									defaultValue={true}
									variant="outlined"
									size="small"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={6}>
								<P03ReportTypePicker
									name="RptType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P03OrderTypePicker
									name="OrdName"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<OrderDirPicker
									name="OrdSeq"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P03CalTypePicker
									name="Rate"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="center">
										<StdPrintOutputModePicker
											required
											name="outputType"
											label="執行方式"
										/>
									</FlexBox>
									 */}
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

P03Form.propTypes = {
	readWorking: PropTypes.bool,
	forNewCustomer: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P03Form.displayName = "P03Form";
export default P03Form;







