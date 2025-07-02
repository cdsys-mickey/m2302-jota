import { RecvAcctCurrentSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctCurrentSessionPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import G04RecoverButtonContainer from "./G04RecoverButtonContainer";
import G04 from "@/modules/G04/G04.mjs";
import { TabPanel } from "@mui/lab";

const G04RecoverTabView = (props) => {
	const { handleSessionChange, handleSessionInputChange, ...rest } = props;
	return (
		<TabPanel value={G04.Tabs.RECOVER} {...rest}>
			<Grid container columns={12} spacing={2}>
				<Grid item xs={7} >
					<DatePickerWrapper
						name="recYM"
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
						name="recSession"
						forSession
						label="期別"
						fullWidth
						validate
						clearable
						virtualize
						onChanged={handleSessionChange}
						onInputChange={handleSessionInputChange}
						required
						rules={{
							required: "帳款年月+期別為必填",
						}}
					/>
				</Grid>
				<FlexBox fullWidth />
			</Grid>
			<Box mt={2}>
				<FlexToolbar
					borderBottom={false}
					rightComponents={
						<>
							<G04RecoverButtonContainer />
						</>}
				/>
			</Box>
		</TabPanel>
	)
}
G04RecoverTabView.propTypes = {
	handleSessionChange: PropTypes.func,
	handleSessionInputChange: PropTypes.func
}
G04RecoverTabView.displayName = "G04RecoverTabView";
export default G04RecoverTabView;