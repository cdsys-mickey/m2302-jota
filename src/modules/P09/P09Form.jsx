import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import CustomerPicker from "@/components/picker/CustomerPicker";
import { OutboundTypePicker } from "@/components/picker/OutboundTypePicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { PrintReportButton } from "@/components";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import P09ReportTypePicker from "./pickers/P09ReportTypePicker";
import P09DataSourcePicker from "./pickers/P09DataSourcePicker";
import P09OrderTypePicker from "./pickers/P09OrderTypePicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import P09CalTypePicker from "./pickers/P09CalTypePicker";

const P09Form = memo((props) => {
	const { onSubmit, onDebugSubmit, forNewCustomer, ...rest } = props;
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
										label="日期區間"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label="日期區間迄"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P09DataSourcePicker
									label="資料來源"
									name="Source"
									disableOpenOnInput
									selectOnFocus
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
							<Grid item xs={12} sm={6}>
								<CheckboxExWrapper
									label="含試贈樣"
									name="InclTest"
									defaultValue={true}
									size="small"
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={6}>
								<P09ReportTypePicker
									label="報表型態"
									name="RptType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P09OrderTypePicker
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
								<P09CalTypePicker
									name="Rate"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1.8}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="center">
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

P09Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P09Form.displayName = "P09Form";
export default P09Form;







