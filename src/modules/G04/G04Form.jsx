import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import CustomerPicker from "@/components/picker/CustomerPicker";
import RecvAcctCurrentCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctCurrentCustomerPicker";
import { RecvAcctCurrentSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctCurrentSessionPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import G04 from "./G04.mjs";
import G04CreateBatchButtonContainer from "./G04CreateBatchButtonContainer";
import G04DeleteButtonContainer from "./G04DeleteButtonContainer";

const G04TabPanel = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel {...rest} sx={{
			paddingBottom: 0
		}}></TabPanel>
	);
}

const G04Form = memo((props) => {
	const { selectedTab, handleTabChange, handleDelSessionChange, handleDelSessionInputChange, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox pt={0}>
						<TabContext value={selectedTab}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTabChange}>
									<Tab label="形成批次" value={G04.Tabs.CREATE} />
									<Tab label="刪除" value={G04.Tabs.DELETE} />
								</TabList>
							</Box>
							<G04TabPanel value={G04.Tabs.CREATE}>
								<Grid container columns={12} spacing={2}>
									<Grid item xs={12} sm={7}>
										<DatePickerWrapper
											name="AccYM"
											label="帳款年月"
											fullWidth
											validate
											// clearable
											autoFocus
											views={['year', 'month']}
											format="yyyy/MM"
											required
											placeholder="年/月"
										/>
									</Grid>
									<Grid item xs={12} sm={5}>
										<TextFieldWrapper
											name="Stage"
											label="期別"
											size="small"
											clearable
											type="number"
											fullWidth
											required
											rules={{
												required: "期別為必填"
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<DatePickerWrapper
											name="CutDate"
											label="截止日"
											clearable
											validate
											fullWidth
											required
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
										<CustomerPicker
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
								<Box mt={2}>
									<FlexToolbar
										borderBottom={false}
										rightComponents={
											<>
												<G04CreateBatchButtonContainer />
											</>}
									/>
								</Box>
							</G04TabPanel>
							<G04TabPanel value={G04.Tabs.DELETE}>
								<Grid container columns={12} spacing={2}>
									<Grid item xs={7} >
										<DatePickerWrapper
											name="delYM"
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

									<Grid item xs={5} >
										<RecvAcctCurrentSessionPicker
											name="delSession"
											forSession
											label="期別"
											fullWidth
											validate
											clearable
											virtualize
											onChanged={handleDelSessionChange}
											onInputChange={handleDelSessionInputChange}
											required
											rules={{
												required: "帳款年月+期別為必填",
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextFieldWrapper
											name="delRecGroup"
											label="應收帳組別"
											size="small"
											clearable
											type="number"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<RecvAcctCurrentCustomerPicker
											name="delCustID"
											size="small"
											virtualize
											disableOpenOnInput
											selectOnFocus
											fullWidth
											sessName="delSession"
											label="客戶編號"
										// placeholder="客戶編號"
										/>
									</Grid>

									<FlexBox fullWidth />
								</Grid>
								<Box mt={2}>
									<FlexToolbar
										borderBottom={false}
										rightComponents={
											<>
												<G04DeleteButtonContainer />
											</>}
									/>
								</Box>
							</G04TabPanel>
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
	handleTabChange: PropTypes.func,
	handleDelSessionChange: PropTypes.func,
	handleDelSessionInputChange: PropTypes.func
};

G04Form.displayName = "G04Form";
export default G04Form;






