import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import CustomerPicker from "@/components/picker/CustomerPicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import ProdFreeTypePicker from "@/components/prod-free-type-picker/ProdFreeTypePicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import H16OrderTypePicker from "./pickers/H16OrderTypePicker";
import H16ReportTypePicker from "./pickers/H16ReportTypePicker";
import RangeGroup from "@/shared-components/RangeGroup";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";

const H16Form = memo((props) => {
	const { forNewCustomer, onSubmit, onDebugSubmit, ...rest } = props;
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
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="預計到貨區間"
									leftComponent={<DatePickerWrapper
										name="SArrDate"
										label="日期區間"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EArrDate"
										label="日期區間迄"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="貨號區間"
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
										name="cust"
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
										name="cust2"
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
							<Grid item xs={12} sm={6}>
								<H16ReportTypePicker
									label="報表型態"
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H16OrderTypePicker
									name="orderType"
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
									</FlexBox> */}
								</Grid>
								<Grid item xs={12} sm={6}>
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
		</ContainerEx >
	);
});

H16Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H16Form.displayName = "H16Form";
export default H16Form;






