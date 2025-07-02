import RecvAcctCurrentCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctCurrentCustomerPicker";
import { RecvAcctCurrentSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctCurrentSessionPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TabPanel } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import G04 from "../../G04.mjs";
import G04DeleteButtonContainer from "./G04DeleteButtonContainer";

const G04DeleteTabView = (props) => {
	const { handleDelSessionChange, handleDelSessionInputChange, ...rest } = props;
	return (
		<TabPanel value={G04.Tabs.DELETE} {...rest}>
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
					// required
					// rules={{
					// 	required: "帳款年月+期別為必填",
					// }}
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
		</TabPanel>
	)
}
G04DeleteTabView.propTypes = {
	handleDelSessionChange: PropTypes.func,
	handleDelSessionInputChange: PropTypes.func
}
G04DeleteTabView.displayName = "G04DeleteTabView";
export default G04DeleteTabView;