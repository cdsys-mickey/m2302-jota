// import CabinetTypes from "@/modules/md-cabinet-types";

import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { EmployeePicker } from "../../../picker/EmployeePicker";
import { ProdLinePickerContainer } from "../../../picker/ProdLinePickerContainer";

const D07SearchPopper = memo(
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
					<Divider sx={{ mt: 0, mb: 0 }} />
					<Grid container spacing={1.5} columns={12}>
						<Grid item xs={12} sm={12}>
							<EmployeePicker name="employee" label="編輯人員" />
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
D07SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	ContentProps: PropTypes.object,
};
D07SearchPopper.displayName = "D07SearchPopper";

export default D07SearchPopper;