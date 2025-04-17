import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";

const G01Form = memo((props) => {
	const { onSubmit, onDebugSubmit, onCustomerChange, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="資料截止日期"
									fullWidth
									validate
									clearable
									autoFocus
									// views={['year', 'month']}
									format="yyyy/MM/dd"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<CustomerPicker
									name="CustID"
									forNew
									forId
									// label="客戶編號"
									disableOpenOnInput
									// slotProps={{
									// 	paper: {
									// 		sx: {
									// 			width: 360,
									// 		},
									// 	},
									// }}
									onChanged={onCustomerChange}
								/>
							</Grid>
							<Grid item xs={12} >
								<TextFieldWrapper
									name="CustName"
									label="客戶名稱"
									size="small"
									fullWidth
									clearable
								/>
							</Grid>
							<Grid item xs={12} >
								<TextFieldWrapper
									name="Tel"
									label="客戶電話"
									size="small"
									fullWidth
									clearable
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
		</ContainerEx>
	);
});

G01Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	onCustomerChange: PropTypes.func
};

G01Form.displayName = "G01Form";
export default G01Form;




