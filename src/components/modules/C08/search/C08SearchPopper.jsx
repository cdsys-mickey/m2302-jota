// import CabinetTypes from "@/modules/md-cabinet-types";

import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
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
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { EmployeePicker } from "@/components/picker/EmployeePicker";
import DeptPickerContainer from "../../../DeptPickerContainer";
import TransportTypePicker from "../../../tranport-type-picker/TransportTypePicker";

const C08SearchPopper = memo(
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
				<DialogContent {...ContentProps}>
					<Divider sx={{ mt: 0, mb: 2 }} />
					<Grid container spacing={1.5} columns={12}>
						<Grid item xs={12} sm={12}>
							<DatePickerWrapper
								name="txoDate"
								label="撥出日期(>)"
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<EmployeePicker name="employee" label="倉管人員" />
						</Grid>
						<Grid item xs={12} sm={12}>
							<EmployeePicker
								name="deliveryEmployee"
								label="配送人員"
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<DeptPickerContainer
								name="txiDept"
								label="撥入門市"
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TransportTypePicker
								name="transType"
								label="貨運類別"
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
						variant="contained"
						color="warning"
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
C08SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	ContentProps: PropTypes.object,
};
C08SearchPopper.displayName = "C08SearchPopper";

export default C08SearchPopper;
