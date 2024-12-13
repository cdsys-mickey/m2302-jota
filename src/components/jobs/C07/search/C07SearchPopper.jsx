// import CabinetTypes from "@/modules/md-cabinet-types";

import EmployeePicker from "@/components/picker/EmployeePicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import DeptPicker from "../../../picker/DeptPicker";

const C07SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
			onClear,
			ContentProps,
			// ...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<Divider sx={{ mt: 0, mb: 0 }} />
				<DialogContent {...ContentProps}>
					<Grid container spacing={1.5} columns={12}>
						<Grid item xs={12} sm={12}>
							<DatePickerWrapper
								name="ordDate"
								label="訂貨日期"
								size="small"
								validate
							// slotProps={{
							// 	field: {
							// 		clearable: true,
							// 	},
							// }}
							/>
						</Grid>

						<Grid item xs={12} sm={12}>
							<DatePickerWrapper
								name="arrDate"
								label="預計到貨日期"
								validate
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<DeptPicker
								name="ordDept"
								label="訂貨門市"
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<EmployeePicker name="employee" label="製單人員" disableOpenOnInput />
						</Grid>
						<Grid item xs={12} sm={12}>
							<SquaredPicker name="squared" label="結清註記" disableOpenOnInput />
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					<ButtonWrapper
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						重設
					</ButtonWrapper>
					{/* <ButtonWrapper
						size="small"
						variant="contained"
						color="inherit"
						onClick={onClear}>
						清除
					</ButtonWrapper> */}
					<ButtonWrapper
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonWrapper>
				</DialogActions>
			</PopperBox>
		);
	})
);
C07SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	onClear: PropTypes.func,
	ContentProps: PropTypes.object,
};
C07SearchPopper.displayName = "C07SearchPopper";

export default C07SearchPopper;
