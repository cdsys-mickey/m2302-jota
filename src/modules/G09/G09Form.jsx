import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import RecvAcctRcptCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctRcptCustomerPicker";
import { FlexBox } from "@/shared-components";
import G09ReportTypePicker from "./picker/G09ReportTypePicker";
import { RecvAcctRcptSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctRcptSessionPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";

const G09Form = memo((props) => {
	const { onSubmit, onDebugSubmit, onSessionChanged, htmlOnly, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={7} >
								<DatePickerWrapper
									name="AccYM"
									label="帳款年月"
									fullWidth
									validate
									// clearable
									autoFocus
									views={['year', 'month']}
									format="yyyy/MM"
									// required
									placeholder="年/月"
								/>
							</Grid>
							<Grid item xs={12} sm={5}>
								<RecvAcctRcptSessionPicker
									name="session"
									label="期別"
									fullWidth
									forSession
									validate
									clearable
									autoFocus
									virtualize
									required
									rules={{
										required: "期別為必填",
									}}
									onChanged={onSessionChanged}
								/>
								{/* <RecvAccountPrevSessionPicker
									name="session"
									label="帳款年月+期別"
									fullWidth
									validate
									clearable
									autoFocus
									virtualize
									required
									rules={{
										required: "帳款年月+期別為必填",
									}}
									onChanged={onSessionChanged}
								/> */}
							</Grid>
							<Grid item xs={12} sm={12}>
								<RecvAcctRcptCustomerPicker
									name="CustID"
									size="small"
									label="客戶代號"
									virtualize
									disableOpenOnInput
									selectOnFocus
									// borderless
									placeholder="起"
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<G09ReportTypePicker
									name="RptType"
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
											htmlOnly={htmlOnly}
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

G09Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	onCustomerChange: PropTypes.func,
	onSessionChanged: PropTypes.func,
	htmlOnly: PropTypes.bool,
};

G09Form.displayName = "G09Form";
export default G09Form;






