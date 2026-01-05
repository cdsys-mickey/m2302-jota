import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CustomerPicker from "@/components/picker/CustomerPicker";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H08OrderTypePicker from "./pickers/H08OrderTypePicker";

const H08Form = memo((props) => {
	const { onSubmit, onDebugSubmit, forNewCustomer, ...rest } = props;
	return (
		<ContainerEx maxWidth={"30rem"} alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
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

						<CheckboxExField
							label="零售客戶"
							name="retail"
							defaultValue={false}
							size="small"
						/>
						<Grid container columns={12} spacing={1}>
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





