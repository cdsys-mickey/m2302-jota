// import CabinetTypes from "@/modules/md-cabinet-types";

import ButtonWrapper from "@/shared-components/ButtonWrapper";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D02SearchFormContainer from "./D02SearchFormContainer";
import D02SearchForm from "./D02SearchForm";


const D02SearchPopper = memo(
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
					<D02SearchForm />
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
						清除
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
D02SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	ContentProps: PropTypes.object,
};
D02SearchPopper.displayName = "D02SearchPopper";

export default D02SearchPopper;
