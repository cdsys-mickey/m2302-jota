import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import RecvAcctBatchCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctBatchCustomerPicker";
import { RecvAcctBatchSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctBatchSessionPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import G04CreateBatchButtonContainer from "./G04CreateBatchButtonContainer";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import G04DeleteButtonContainer from "./G04DeleteButtonContainer";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import G04 from "./G04.mjs";

const G04Form = memo((props) => {
	const { onSubmit, selectedTab, handleTabChange, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									<Tab label="形成批次" value={G04.Tabs.CREATE} />
									<Tab label="刪除" value={G04.Tabs.DELETE} />
								</TabList>
							</Box>
							<TabPanel value={G04.Tabs.CREATE}>
								<Grid container columns={12} spacing={2}>
									<Grid item xs={12} >
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
										// onChanged={onSessionChanged}
										// disableClose
										/>
									</Grid>
									<Grid item xs={12}>
										<DatePickerWrapper
											name="CutDate"
											label="截止日"
											clearable
											validate
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<TextFieldWrapper
											name="RecGroup"
											label="應收帳組別"
											size="small"
											clearable
											type="number"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<RecvAcctBatchCustomerPicker
											name="CustID"
											size="small"
											virtualize
											disableOpenOnInput
											selectOnFocus
											fullWidth
										// placeholder="客戶編號"
										/>
									</Grid>

									<FlexBox fullWidth />
								</Grid>
								<Box mt={1}>
									<FlexToolbar
										borderBottom={false}
										rightComponents={
											<>
												<G04CreateBatchButtonContainer />
											</>}
									/>
								</Box>
							</TabPanel>
							<TabPanel value={G04.Tabs.DELETE}>
								<Grid container columns={12} spacing={2}>
									<Grid item xs={12} >
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
										/>
									</Grid>
									<Grid item xs={12}>
										<TextFieldWrapper
											name="RecGroup"
											label="應收帳組別"
											size="small"
											clearable
											type="number"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<RecvAcctBatchCustomerPicker
											name="CustID"
											size="small"
											virtualize
											disableOpenOnInput
											selectOnFocus
											fullWidth
										// placeholder="客戶編號"
										/>
									</Grid>

									<FlexBox fullWidth />
								</Grid>
								<Box mt={1}>
									<FlexToolbar
										borderBottom={false}
										rightComponents={
											<>
												<G04DeleteButtonContainer />
											</>}
									/>
								</Box>
							</TabPanel>
						</TabContext>


					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

G04Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	selectedTab: PropTypes.string,
	handleTabChange: PropTypes.func
};

G04Form.displayName = "G04Form";
export default G04Form;






