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
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import H08OrderTypePicker from "./pickers/H08OrderTypePicker";

const H08Form = memo((props) => {
	const { onSubmit, onDebugSubmit, forNewCustomer, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									autoFocus
									name="SDate"
									label="日期區間"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="日期區間迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6.5}>
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
							<Grid item xs={12} sm={6}>
								<CustomerPicker
									name="cust"
									label="客戶區間起"
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
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomerPicker
									name="cust2"
									label="客戶區間迄"
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
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H08OrderTypePicker
									name="orderType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							{/* <Grid item xs={12} sm={6}>
								<OrderDirPicker
									name="orderDir"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid> */}
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={2}>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									<StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/>
								</FlexGrid>
								<Grid item xs={12} sm={6}>
									<FlexToolbar align="right">
										<ButtonGroup>
											<DebugDialogButtonContainer
												onClick={onDebugSubmit} />
											<ReportSubmitButtonContainer
												onClick={onSubmit} />
										</ButtonGroup>
									</FlexToolbar>
								</Grid>
							</Grid>
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

H08Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H08Form.displayName = "H08Form";
export default H08Form;





