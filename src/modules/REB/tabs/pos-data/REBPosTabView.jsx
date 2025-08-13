import AppDeptPicker from "@/components/fields/AppDeptPicker";
import Auth from "@/modules/md-auth";
import REB from "@/modules/REB/REB.mjs";
import { DatePickerEx } from "@/shared-components";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import { TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import REBPosRebuildButtonContainer from "./REBPosRebuildButtonContainer";

const REBPosTabView = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel value={REB.TabType.POS_DATA} {...rest}>
			<Grid container columns={12} spacing={2}>
				<Grid item xs={12}>
					<AppDeptPicker
						filterByOperator
						label="執行門市"
						name="dept"
						disableOpenOnInput
						selectOnFocus
						// disabled={deptDisabled}
						scope={Auth.SCOPES.BRANCH_HQ}
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<RangeGroup legend="日期區間"
						leftComponent={<DatePickerEx
							name="beginDate"
							fullWidth
							validate
							clearable
							// autoFocus
							borderless
							placeholder="起"
						/>}
						rightComponent={<DatePickerEx
							name="endDate"
							fullWidth
							validate
							clearable
							borderless
							placeholder="迄"
						/>}
					/>
				</Grid>

			</Grid>

			<FlexBox mt={1.8}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<FlexBox justifyContent="flex-end">
							<REBPosRebuildButtonContainer />
						</FlexBox>
					</Grid>
				</Grid>
			</FlexBox>
		</TabPanel>
	);
}

REBPosTabView.propTypes = {
	onSessionChanged: PropTypes.func
}

REBPosTabView.displayName = "REBPosTabView";
export default REBPosTabView;
