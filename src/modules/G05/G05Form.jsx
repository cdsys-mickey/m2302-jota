import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import RecvAcctRcptCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctRcptCustomerPicker";
import { RecvAcctBatchSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctBatchSessionPicker";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import G05ReportTypePicker from "./picker/G05ReportTypePicker";
import RecvAcctBatchCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctBatchCustomerPicker";

const G05Form = memo((props) => {
	const { onSubmit, onDebugSubmit, onSessionChanged, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={4.5}>
								<RecvAcctBatchSessionPicker
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
								// disableClose
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend={"客戶區間"}
									leftComponent={<RecvAcctBatchCustomerPicker
										name="SCustID"
										size="small"
										virtualize
										// forNew={forNewCustomer}
										// optionLabelSize="md"
										disableOpenOnInput
										selectOnFocus
										// slotProps={{
										// 	paper: {
										// 		sx: {
										// 			width: 360,
										// 		},
										// 	},
										// }}
										borderless
										placeholder="起"
									/>}
									rightComponent={<RecvAcctBatchCustomerPicker
										name="ECustID"
										size="small"
										virtualize
										// forNew={forNewCustomer}
										disableOpenOnInput
										selectOnFocus
										// slotProps={{
										// 	paper: {
										// 		sx: {
										// 			width: 360,
										// 		},
										// 	},
										// }}
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<G05ReportTypePicker
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

G05Form.propTypes = {
	forNewCustomer: PropTypes.bool,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	onCustomerChange: PropTypes.func,
	onSessionChanged: PropTypes.func
};

G05Form.displayName = "G05Form";
export default G05Form;





