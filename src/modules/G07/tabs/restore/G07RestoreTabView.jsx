import G07 from "@/modules/G07/G07.mjs";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TabPanel } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import G07RestoreButtonContainer from "./G07RestoreButtonContainer";
import FlexBox from "@/shared-components/FlexBox";

const G07RestoreTabView = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel value={G07.Tabs.RESTORE} {...rest}>
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

			</Grid>

			<FlexBox mt={1.8}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<FlexBox justifyContent="flex-end">
							<G07RestoreButtonContainer />
						</FlexBox>
					</Grid>
				</Grid>
			</FlexBox>
		</TabPanel>
	);
}

G07RestoreTabView.propTypes = {
	onSessionChanged: PropTypes.func
}

G07RestoreTabView.displayName = "G07RestoreTabView";
export default G07RestoreTabView;