// import CabinetTypes from "@/modules/md-cabinet-types";

import EmployeePicker from "@/components/picker/EmployeePicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import { ButtonEx } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import DeptPicker from "../../../picker/DeptPicker";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import C07SearchForm from "./C07SearchForm";
import C07SearchFormContainer from "./C07SearchFormContainer";

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
					<C07SearchForm />
				</DialogContent>
				<Divider />
				<DialogActions>
					<ButtonEx
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						清除
					</ButtonEx>
					{/* <ButtonEx
						size="small"
						variant="contained"
						color="inherit"
						onClick={onClear}>
						清除
					</ButtonEx> */}
					<ButtonEx
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonEx>
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
