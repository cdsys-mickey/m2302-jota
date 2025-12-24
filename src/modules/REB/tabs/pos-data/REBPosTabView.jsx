import AuthDeptPicker from "@/components/AuthDeptPicker";
import Auth from "@/modules/Auth.mjs";
import REB from "@/modules/REB/REB.mjs";
import { DatePickerEx, FormFieldLabel } from "@/shared-components";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import { TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import REBPosRebuildButtonContainer from "./REBPosRebuildButtonContainer";

const REBPosTabView = (props) => {
	const { minDate, onDeptChange, ...rest } = props;
	return (
		<TabPanel value={REB.TabType.POS_DATA} {...rest}>
			<Grid container columns={12} spacing={2}>
				<Grid item xs={12}>
					{/* <AppDeptPicker
						filterByOperator
						label="執行門市"
						name="dept"
						disableOpenOnInput
						selectOnFocus
						// disabled={deptDisabled}
						scope={Auth.SCOPES.BRANCH_HQ}
						autoFocus
						/> */}
					<AuthDeptPicker
						label="門市編號"
						required
						name="dept"
						disableOpenOnInput
						// disabled={deptDisabled}
						onChange={onDeptChange}
						disableByClass={Auth.SCOPES.ROOT}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<RangeGroup legend="日期區間"
						leftComponent={<DatePickerEx
							name="beginDate"
							fullWidth
							validate
							clearable
							autoFocus
							borderless
							placeholder="起"
							minDate={minDate}
						/>}
						rightComponent={<DatePickerEx
							name="endDate"
							fullWidth
							validate
							clearable
							borderless
							placeholder="迄"
							minDate={minDate}
						/>}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormFieldLabel
						// typo
						// editing={false}
						size="small"
						name="CutYM"
						label="結轉年月"
						// inline
						required
						readOnly
						slotProps={{
							"label": {
								sx: {
									marginTop: "-8px",
									marginLeft: "4px"
								}
							}
						}}
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
	onSessionChanged: PropTypes.func,
	onDeptChange: PropTypes.func,
	minDate: PropTypes.object,
	deptDisabled: PropTypes.bool
}

REBPosTabView.displayName = "REBPosTabView";
export default REBPosTabView;
