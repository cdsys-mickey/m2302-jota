// import CabinetTypes from "@/modules/md-cabinet-types";

import SupplierPicker from "@/components/picker/SupplierPicker";
import TaxType2Picker from "@/components/picker/TaxType2Picker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { DatePickerWrapper } from "../../../../shared-components/date-picker/DatePickerWrapper";
import EmployeePicker from "@/components/picker/EmployeePicker";
import DeptPicker from "../../../DeptPicker";

const C09SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
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
								name="tid"
								label="撥入日期(大於)"
								autoFocus
								validate
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<EmployeePicker name="employee" label="驗收人員" disableOpenOnInput />
						</Grid>
						<Grid item xs={12} sm={12}>
							<DeptPicker
								name="txoDept"
								label="撥出門市"
								disableOpenOnInput
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					{/* <ButtonWrapper
						size="small"
						variant="contained"
						color="inherit"
						onClick={onClear}>
						清除
					</ButtonWrapper> */}
					<ButtonWrapper
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						重設
					</ButtonWrapper>
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
C09SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	ContentProps: PropTypes.object,
};
C09SearchPopper.displayName = "C09SearchPopper";

export default C09SearchPopper;
