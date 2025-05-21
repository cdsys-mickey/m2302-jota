import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import RecvAcctRcptCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctRcptCustomerPicker";
import { RecvAcctRcptSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctRcptSessionPicker";
import FlexBox from "@/shared-components/FlexBox";
import G07CarryForwardButtonContainer from "./G07CarryForwardButtonContainer";
import { RecvAcctBatchSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctBatchSessionPicker";
import RecvAcctBatchCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctBatchCustomerPicker";

const G07Form = memo((props) => {
	const { onSubmit, onDebugSubmit, onSessionChanged, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
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
								<RecvAcctBatchCustomerPicker
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
							{/* <Grid item xs={12} sm={12}>
								<G07ReportTypePicker
									name="RptType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid> */}
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
										<G07CarryForwardButtonContainer />
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

G07Form.propTypes = {
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

G07Form.displayName = "G07Form";
export default G07Form;








